export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* خلفية دائرية */}
            <circle cx="50" cy="50" r="48" fill="#0B1F3A" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#dba61f" strokeWidth="1.5" />

            {/* أيقونة مفتاح الصيانة */}
            <g transform="translate(50,50) rotate(-45)">
                {/* جسم المفتاح */}
                <rect x="-4" y="-22" width="8" height="30" rx="2" fill="#dba61f" />
                {/* رأس المفتاح */}
                <circle cx="0" cy="-24" r="9" fill="none" stroke="#dba61f" strokeWidth="4" />
                <circle cx="0" cy="-24" r="4" fill="#0B1F3A" />
                {/* طرف المفتاح */}
                <rect x="-4" y="6" width="4" height="5" rx="1" fill="#dba61f" />
                <rect x="0" y="9" width="4" height="4" rx="1" fill="#dba61f" />
            </g>

            {/* نجمة صغيرة في الزاوية */}
            <polygon
                points="82,18 83.5,22.5 88,22.5 84.5,25.5 86,30 82,27 78,30 79.5,25.5 76,22.5 80.5,22.5"
                fill="#dba61f"
                opacity="0.9"
            />

            {/* نص الشركة */}
            <text
                x="50"
                y="76"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="8"
                fontWeight="bold"
                fill="#dba61f"
                letterSpacing="0.5"
            >
                الرواد
            </text>
            <text
                x="50"
                y="86"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="5.5"
                fill="#94a3b8"
                letterSpacing="0.3"
            >
                للصيانة
            </text>
        </svg>
    );
}
