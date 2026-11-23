import type { ReactNode} from "react";

type ContentWrapperProps = {
    children: ReactNode;
    backgroundColor?: string;
    padding?: number;
    maxWidth?: number;
}

function ContentWrapper ({
children,
backgroundColor ="#ffffff",
padding = 20,
maxWidth = 1200,
}: ContentWrapperProps) {
    return (
        <div
            style= {{
                width: "100%",
                maxWidth: `${maxWidth}px`,
                margin: "0 auto",
                padding: `${padding}px`,
                backgroundColor: backgroundColor,
                boxSizing: "border-box",
            }}
            >
            {children}
            </div>
    );
}

export default ContentWrapper;









    
    