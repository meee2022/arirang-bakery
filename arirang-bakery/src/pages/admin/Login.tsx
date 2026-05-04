import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { Logo } from "../../components/Logo";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

function parseConvexError(err: any, lang: string): string {
  const raw: string = err?.message || "";
  const match = raw.match(/Uncaught Error: (.+?)(?:\s+at\s+handler|\s+Called by|$)/s);
  const extracted = (match?.[1] ?? raw).trim().split("\n")[0];

  if (extracted.includes("البريد") || extracted.includes("Invalid email")) {
    return lang === "ar"
      ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
      : "Incorrect email or password";
  }
  if (extracted.includes("قيد المراجعة") || extracted.includes("pending")) {
    return lang === "ar"
      ? "حسابك قيد المراجعة. تواصل مع المدير للموافقة"
      : "Your account is pending admin approval";
  }
  if (extracted.includes("مسجل مسبقاً") || extracted.includes("already registered")) {
    return lang === "ar"
      ? "هذا البريد الإلكتروني مسجل مسبقاً"
      : "This email is already registered";
  }
  if (extracted.includes("6 أحرف") || extracted.includes("6 characters")) {
    return lang === "ar"
      ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
      : "Password must be at least 6 characters";
  }
  if (extracted.includes("مطلوب") || extracted.includes("required")) {
    return lang === "ar" ? "جميع الحقول مطلوبة" : "All fields are required";
  }
  if (extracted) return extracted.split("|")[lang === "ar" ? 0 : 1]?.trim() || extracted;
  return lang === "ar"
    ? "حدث خطأ، يرجى المحاولة مرة أخرى"
    : "Something went wrong, please try again";
}

export default function Login() {
  const { login } = useAuth();
  const { lang, toggleLang } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = useMutation(api.users.login);
  const registerUser = useMutation(api.users.register);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        const userData = await loginUser({ email: form.email, password: form.password });
        login(userData);
        navigate("/admin");
      } else {
        const userData = await loginUser({ email: form.email, password: form.password });
        login(userData);
        navigate("/admin");
      }
    } catch (err: any) {
      setError(parseConvexError(err, lang));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen burgundy-bg pattern-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo light size="lg" />
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
          <h2
            className="text-2xl font-bold text-[#1C1008] mb-1 text-center"
            style={{ fontFamily: "Cairo,serif" }}
          >
            {isRegister
              ? lang === "ar" ? "إنشاء حساب جديد" : "Create Account"
              : lang === "ar" ? "تسجيل دخول الإدارة" : "Admin Login"}
          </h2>
          <p
            className="text-[#7A6A58] text-sm text-center mb-7"
            style={{ fontFamily: "Cairo,Inter,serif" }}
          >
            {lang === "ar" ? "لوحة تحكم اريرانج بيكري" : "Arirang Bakery Control Panel"}
          </p>

          {error && (
            <div
              className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-red-700 text-sm text-center"
              style={{ fontFamily: "Cairo,Inter,serif" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label
                  className="block text-sm font-semibold text-[#1C1008] mb-1.5"
                  style={{ fontFamily: "Cairo,Inter,serif" }}
                >
                  {lang === "ar" ? "الاسم" : "Name"}
                </label>
                <input
                  required
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            )}
            <div>
              <label
                className="block text-sm font-semibold text-[#1C1008] mb-1.5"
                style={{ fontFamily: "Cairo,Inter,serif" }}
              >
                {lang === "ar" ? "البريد الإلكتروني" : "Email"}
              </label>
              <input
                required
                dir="ltr"
                type="email"
                className="form-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-[#1C1008] mb-1.5"
                style={{ fontFamily: "Cairo,Inter,serif" }}
              >
                {lang === "ar" ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative">
                <input
                  required
                  dir="ltr"
                  type={showPass ? "text" : "password"}
                  className="form-input pr-10"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-[#7A6A58] hover:text-[#6B1A2A]"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5"
              disabled={loading}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              ) : isRegister ? (
                lang === "ar" ? "إنشاء حساب" : "Register"
              ) : (
                lang === "ar" ? "تسجيل الدخول" : "Login"
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(""); setForm({ name: "", email: "", password: "" }); }}
              className="text-sm font-semibold text-[#1C1008] hover:text-[#C9A96E] transition-colors underline"
            >
              {isRegister
                ? lang === "ar" ? "لدي حساب بالفعل — تسجيل دخول" : "Already have an account? Login"
                : lang === "ar" ? "ليس لديك حساب؟ إنشاء حساب" : "Don't have an account? Register"}
            </button>
          </div>

          <div className="mt-3 text-center">
            <button
              onClick={toggleLang}
              className="text-sm text-[#C9A96E] hover:text-[#6B1A2A] transition-colors"
            >
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
