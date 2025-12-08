import { useState, useEffect } from "react";
import useStore from "../../store"
import { LuSunMoon } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";

const ThemeSwitch = () => {
    const { theme, setTheme } = useStore((state) => state);
    const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

    // Sync local state with store
    useEffect(() => {
        setIsDarkMode(theme === 'dark');
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setIsDarkMode(!isDarkMode);
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // IMPORTANT: Apply theme to HTML element (SAME as Settingsform)
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
    }

    return (
        <button onClick={toggleTheme} className="outline-none">
            {isDarkMode ? (
                <LuSunMoon size={26} className="text-gray-500"/>
            ) : (
                <IoMoonOutline size={26} className=''/>
            )}
        </button>
    )
}

export default ThemeSwitch