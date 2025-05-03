import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { runApiTests } from "../../../lib/api-tester";
import { supabase } from "../../../lib/supabase";

export default function DebugScreen() {
  const [testResults, setTestResults] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    setTestResults("Đang chạy tests...");

    try {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user?.id;

      if (!userId) {
        setTestResults("Lỗi: Bạn chưa đăng nhập. Vui lòng đăng nhập trước.");
        setIsLoading(false);
        return;
      }

      // Ghi đè console.log để thu thập kết quả
      const originalLog = console.log;
      const originalError = console.error;
      let logs: string[] = [];

      console.log = (...args) => {
        originalLog(...args);
        logs.push(
          args
            .map((arg) =>
              typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
            )
            .join(" ")
        );
      };

      console.error = (...args) => {
        originalError(...args);
        logs.push(
          "ERROR: " +
            args
              .map((arg) =>
                typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
              )
              .join(" ")
        );
      };

      await runApiTests(userId);

      // Khôi phục console.log
      console.log = originalLog;
      console.error = originalError;

      setTestResults(logs.join("\n"));
    } catch (error: any) {
      setTestResults(`Lỗi không mong muốn: ${error.message || String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={runTests}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Đang chạy..." : "Chạy API Tests"}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultContainer}>
        <Text style={styles.resultText}>{testResults}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },
  resultText: {
    fontFamily: "monospace",
  },
});
