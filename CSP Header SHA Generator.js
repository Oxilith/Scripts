        async function generateCSPHashes() {
            const htmlContent = document.documentElement.outerHTML;
            const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
            const styleRegex = /<style>([\s\S]*?)<\/style>/g;
            const svgStyleRegex = /<svg style([\s\S]*?)<\/svg>/g;

            let cspHeader = "Content-Security-Policy: upgrade-insecure-requests; block-all-mixed-content; frame-ancestors 'self';  default-src 'self'; default-src 'self'; script-src 'self'";
            let match;

            while ((match = scriptRegex.exec(htmlContent)) !== null) {
                const hashBuffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(match));
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
                cspHeader += ` 'sha256-${hashBase64}'`;
            }

            cspHeader += "; style-src 'self'";

            while ((match = styleRegex.exec(htmlContent)) !== null) {
                const hashBuffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(match));
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
                cspHeader += ` 'sha256-${hashBase64}'`;
            }
			
			while ((match = svgStyleRegex.exec(htmlContent)) !== null) {
                const hashBuffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(match));
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
                cspHeader += ` 'sha256-${hashBase64}'`;
            }

            console.log(cspHeader);
        }

        generateCSPHashes();
		
