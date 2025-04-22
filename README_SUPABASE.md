# Supabase Authentication Setup

Ứng dụng này sử dụng Supabase cho việc xác thực người dùng. Hãy thực hiện theo các bước sau để cấu hình Supabase và tích hợp vào ứng dụng của bạn.

## 1. Tạo dự án Supabase

1. Đăng nhập vào [Supabase](https://supabase.com/)
2. Tạo dự án mới
3. Lưu lại URL và anon key của dự án, bạn sẽ cần chúng sau này

## 2. Tạo bảng Profiles

1. Vào phần **SQL Editor** trong dashboard của Supabase
2. Tạo một query mới và dán mã SQL sau:

```sql
-- Create a table for public profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  email TEXT,
  updated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create a function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, updated_at)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'display_name', now());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

3. Nhấn **Run** để tạo bảng và các policies

## 3. Cấu hình Authentication

1. Trong dashboard Supabase, đi đến **Authentication** → **Providers**
2. Đảm bảo provider **Email** đã được bật
3. Cấu hình đăng nhập với Google (nếu muốn):
   - Bật provider Google
   - Làm theo hướng dẫn để lấy Client ID và Client Secret từ [Google Cloud Console](https://console.cloud.google.com/)
   - Điền thông tin vào form và lưu lại

## 4. Cấu hình Email Templates (Tùy chọn)

1. Trong dashboard Supabase, đi đến **Authentication** → **Email Templates**
2. Tùy chỉnh các mẫu email cho:
   - Email xác nhận
   - Email mời
   - Email liên kết magic
   - Email đặt lại mật khẩu

## 5. Cấu hình App

1. Mở file `app/lib/supabase.ts` trong ứng dụng của bạn
2. Cập nhật URL và anon key Supabase:

```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

## 6. Kiểm tra luồng xác thực

Bây giờ bạn có thể chạy ứng dụng và kiểm tra:

1. Đăng ký tài khoản mới
2. Xác nhận email (nếu cần)
3. Đăng nhập với tài khoản đã tạo
4. Đăng nhập với Google
5. Đặt lại mật khẩu

## 7. Xử lý lỗi phổ biến

- **Error: Failed to fetch**: Kiểm tra URL Supabase
- **Error: Invalid API key**: Kiểm tra anon key Supabase
- **Error: Email not confirmed**: Kiểm tra cấu hình xác nhận email trong Supabase
- **Error: User already registered**: Email đã được đăng ký trước đó

## 8. Bảo mật

- RLS (Row Level Security) đã được bật mặc định
- Đảm bảo rằng bạn không lưu trữ thông tin nhạy cảm trong bảng profiles
- Kiểm tra các policies trước khi deploy lên production

## 9. Tìm hiểu thêm

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [React Native with Supabase Auth](https://supabase.com/docs/guides/auth/auth-expo)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 