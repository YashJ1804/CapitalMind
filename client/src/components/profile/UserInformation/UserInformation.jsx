function UserInformation({ user }) {

    const info = [

        {
            label: "Full Name",
            value: user?.name || "-"
        },

        {
            label: "Email Address",
            value: user?.email || "-"
        },

        {
            label: "User ID",
            value: user?.id || "-"
        },

        {
            label: "Account Type",
            value: "Standard User"
        }

    ];

    return (

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

            <div className="mb-8">

                <h2 className="text-3xl font-black text-white">

                    👤 User Information

                </h2>

                <p className="mt-2 text-slate-400">

                    Your account details.

                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                {

                    info.map((item) => (

                        <div
                            key={item.label}
                            className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
                        >

                            <p className="text-xs uppercase tracking-widest text-slate-500">

                                {item.label}

                            </p>

                            <h3 className="mt-3 break-all text-xl font-bold text-white">

                                {item.value}

                            </h3>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default UserInformation;