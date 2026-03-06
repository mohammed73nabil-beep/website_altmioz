import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import ApplicationLogo from '@/Components/ApplicationLogo';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/login.css';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="تسجيل الدخول" />

            <div className="login-center">
                <form onSubmit={submit} className="form" noValidate>

                    {/* شعار الشركة */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Link href="/">
                            <ApplicationLogo style={{ width: '72px', height: '72px', filter: 'drop-shadow(0 4px 12px rgba(219,166,31,0.35))' }} />
                        </Link>
                        <span style={{
                            color: '#dba61f',
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            letterSpacing: '0.08em',
                            fontFamily: 'Arial, sans-serif',
                        }}>
                            الرواد للصيانة
                        </span>
                    </div>

                    <h2 id="heading">أهلاً بك أبوطارق</h2>

                    {status && (
                        <div style={{ color: '#4ade80', fontSize: '0.875rem', textAlign: 'center', padding: '0.5rem', background: 'rgba(74,222,128,0.1)', borderRadius: '8px' }}>
                            {status}
                        </div>
                    )}

                    {/* حقل الإيميل */}
                    <div className="field">
                        <svg className="input-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="input-field"
                            placeholder="البريد الإلكتروني"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />

                    {/* حقل كلمة المرور */}
                    <div className="field">
                        <svg className="input-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0v3H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2zm-8-3a3 3 0 116 0v3H10V7z" />
                        </svg>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="input-field"
                            placeholder="كلمة المرور"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />

                    {/* تذكرني */}
                    <div className="mt-4 block">
                        <label className="flex items-center" style={{ cursor: 'pointer', gap: '0.5rem' }}>
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>تذكرني</span>
                        </label>
                    </div>

                    {/* أزرار */}
                    <div className="btn">
                        {canResetPassword && (
                            <Link href={route('password.request')} className="button1">
                                نسيت كلمة المرور؟
                            </Link>
                        )}

                        <PrimaryButton className="button2" disabled={processing}>
                            {processing ? '...' : 'دخول'}
                        </PrimaryButton>
                    </div>

                </form>
            </div>
        </GuestLayout>
    );
}
