// "use client";

// import * as React from "react";
// import { Check, ChevronDown } from "lucide-react";
// import { useLocale } from "next-intl";



// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuRadioGroup,
//     DropdownMenuRadioItem,
//     DropdownMenuTrigger,
// } from "@/shared/ui/dropdown-menu";
// import { usePathname, useRouter } from "@/shared/config/i18n/navigation";
// import { Button } from "@/components/ui/button";

// const languages = [
//     { code: "en" }, 
//     { code: "uk" },
//     { code: "fi" },
// ];

// export function LanguageSwitcher() {
//     const currentLocale = useLocale(); 
//     const router = useRouter();
//     const pathname = usePathname();
//     const handleLanguageChange = (newLocale: string) => {
//         if (newLocale !== currentLocale) {
//             router.push(pathname, { locale: newLocale });
//         }
//     };

//     const buttonText = currentLocale.toUpperCase();

//     const languagesForMenu = languages.filter(
//         (lang) => lang.code !== currentLocale
//     );

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//                 <Button variant="secondary" className="flex items-center gap-1.5 px-3 min-w-[5rem] border-none ">
//                     <span>{buttonText}</span>
//                     <ChevronDown className="h-4 w-4 opacity-50" />
//                     <span className="sr-only">Змінити мову</span>
//                 </Button>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent align="start" className="min-w-[5rem] border-none bg-base-dark-backgroundTertiary">
//                 <DropdownMenuRadioGroup
//                     value={currentLocale} 
//                     onValueChange={handleLanguageChange}
//                 >
//                     {languagesForMenu.map((lang) => (
//                         <DropdownMenuRadioItem
//                             key={lang.code}
//                             value={lang.code}
//                             className="justify-start"
//                         >
//                             {lang.code.toUpperCase()}
//                         </DropdownMenuRadioItem>
//                     ))}
//                 </DropdownMenuRadioGroup>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// }