export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* خلفية دائرية */}
            <circle cx="50" cy="50" r="48" fill="#0B1120" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#C5A059" strokeWidth="1.5" />

            {/* أيقونة شجرة/ورقة شجر (Tree/Leaf icon) */}
            <g transform="translate(50,45)">
                {/* جذع الشجرة */}
                <path d="M-4,15 C-4,25 -8,30 -8,30 L8,30 C8,30 4,25 4,15 Z" fill="#C5A059" />
                {/* أوراق الشجرة */}
                <circle cx="0" cy="-5" r="14" fill="#C5A059" opacity="0.9" />
                <circle cx="-12" cy="5" r="10" fill="#C5A059" />
                <circle cx="12" cy="5" r="10" fill="#C5A059" />
            </g>

            {/* نجمة صغيرة في الزاوية */}
            <polygon
                points="82,18 83.5,22.5 88,22.5 84.5,25.5 86,30 82,27 78,30 79.5,25.5 76,22.5 80.5,22.5"
                fill="#C5A059"
                opacity="0.9"
            />

            {/* نص الشركة */}
            <text
                x="50"
                y="80"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="8"
                fontWeight="bold"
                fill="#C5A059"
                letterSpacing="0.5"
            >
                حديقتي
            </text>
            <text
                x="50"
                y="88"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="5.5"
                fill="#94a3b8"
                letterSpacing="0.3"
            >
                ديكورات
            </text>
        </svg>
    );
}
