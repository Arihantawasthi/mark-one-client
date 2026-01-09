function TextField({ label, leftIcon, rightIcon, placeholder, value, onChange, error, type="text" }) {
    return (
        <div className="flex flex-col gap-y-2 font-regular w-full">
            { label && <span className="text-on-surface/50">{ label }</span> }
            <div
                className={`py-2 px-4 flex items-center gap-x-3 rounded-xl bg-page-color
                            border ${ error ? "border-sunset-500" : "border-border" } focus-within:border-primary-500`}
            >
                { leftIcon &&
                    <span className="h-6 w-6 flex items-center justify-center">
                        { leftIcon }
                    </span>
                }
                <input
                    className="h-6 w-full leading-6 focus:outline-none text-on-surface placeholder-on-surface/50"
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                { rightIcon &&
                    <span className="h-6 w-6 flex items-center justify-center">
                        { rightIcon }
                    </span>
                }
            </div>
            { error && <p className="text-sunset-500 text-sm">{ error }</p> }
        </div>
    );
}

export default TextField;
