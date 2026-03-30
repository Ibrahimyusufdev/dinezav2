type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string;
};

const baseClasses = "inline-block shrink-0";

// Apple Icon
export const AppleIcon = ({ size = 22, className = "", title = "Apple", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    style={{ width: size, height: size }}
    className={`${baseClasses} ${className}`}
    aria-label={title}
    role="img"
    {...props}
  >
    <path
      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      fill="currentColor"
    />
  </svg>
);

// Google Icon
export const GoogleIcon = ({
  size = 22,
  className = "",
  title = "Google",
  ...props
}: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`${baseClasses} ${className}`}
    style={{ width: size, height: size }}
    aria-label={title}
    role="img"
    {...props}
  >
    <path
      fill="#EA4335"
      d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.2-1.8 2.9l2.9 2.3c1.7-1.6 2.7-3.9 2.7-6.6 0-.6-.1-1.2-.2-1.8H12z"
    />
    <path
      fill="#34A853"
      d="M12 21c2.4 0 4.5-.8 6-2.2l-2.9-2.3c-.8.5-1.8.8-3.1.8-2.4 0-4.4-1.6-5.1-3.8H3.8v2.4C5.3 19.3 8.4 21 12 21z"
    />
    <path
      fill="#FBBC05"
      d="M6.9 13.5c-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5V8.1H3.8C3.3 9.1 3 10 3 12s.3 2.9.8 3.9l3.1-2.4z"
    />
    <path
      fill="#4285F4"
      d="M12 4.8c1.3 0 2.5.5 3.4 1.3l2.5-2.5C16.5 2.2 14.4 1.2 12 1.2 8.4 1.2 5.3 3 3.8 5.7l3.1 2.4c.7-2.2 2.7-3.8 5.1-3.8z"
    />
  </svg>
);

// Meta Icon
export const MetaIcon = ({ size = 22, className = "", title = "Meta", ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={`${baseClasses} ${className}`}
    style={{ width: size, height: size }}
    aria-label={title}
    role="img"
    {...props}
  >
    <path
      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303z"
      fill="currentColor"
    />
  </svg>
);
