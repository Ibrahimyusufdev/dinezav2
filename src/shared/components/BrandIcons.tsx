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

// Instagram Icon
export const InstagramIcon = ({
  size = 22,
  className = "",
  title = "Instagram",
  ...props
}: IconProps) => (
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
      fill="currentColor"
      d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.55 4 20 5.45 20 7.75v8.5C20 18.55 18.55 20 16.25 20h-8.5C5.45 20 4 18.55 4 16.25v-8.5C4 5.45 5.45 4 7.75 4zm4.25 2.5A5.5 5.5 0 1 0 17.5 12 5.51 5.51 0 0 0 12 6.5zm0 2A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm5.75-.88a1.12 1.12 0 1 0 1.12 1.12 1.12 1.12 0 0 0-1.12-1.12z"
    />
  </svg>
);

// Twitter Icon
export const TwitterIcon = ({
  size = 22,
  className = "",
  title = "X",
  ...props
}: IconProps) => (
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
      fill="currentColor"
      d="M18.244 2H21l-6.56 7.5L22 22h-6.828l-5.35-7.007L3.5 22H1l7.02-8.02L2 2h6.828l4.84 6.35L18.244 2zm-2.396 18h1.885L8.39 4H6.364l9.484 16z"
    />
  </svg>
);

// LinkedIn Icon
export const LinkedInIcon = ({
  size = 22,
  className = "",
  title = "LinkedIn",
  ...props
}: IconProps) => (
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
      fill="currentColor"
      d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.5 8h4v14h-4V8zm7 0h3.6v2h.05c.5-.95 1.75-2 3.6-2 3.85 0 4.55 2.53 4.55 5.82V22h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V22h-4V8z"
    />
  </svg>
);

// GitHub Icon
export const GitHubIcon = ({
  size = 22,
  className = "",
  title = "GitHub",
  ...props
}: IconProps) => (
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
      fill="currentColor"
      d="M12 .5C5.65.5.75 5.4.75 11.75c0 5.09 3.29 9.41 7.86 10.94.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.4-2.68 5.36-5.24 5.65.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56 4.56-1.53 7.85-5.85 7.85-10.94C23.25 5.4 18.35.5 12 .5z"
    />
  </svg>
);
