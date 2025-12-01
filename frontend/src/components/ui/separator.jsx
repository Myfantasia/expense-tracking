export const Separator = () => {
    return(
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"/>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 rounded dark:bg-black/10 px-4 text-gray-500">Or</span>
            </div>
        </div>
    )
}