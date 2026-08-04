function ProfileSkeleton() {

    return (

        <div className="space-y-8 animate-pulse">

            <div className="h-48 rounded-3xl bg-slate-900" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <div className="h-36 rounded-3xl bg-slate-900" />
                <div className="h-36 rounded-3xl bg-slate-900" />
                <div className="h-36 rounded-3xl bg-slate-900" />
                <div className="h-36 rounded-3xl bg-slate-900" />

            </div>

            <div className="h-72 rounded-3xl bg-slate-900" />

            <div className="h-64 rounded-3xl bg-slate-900" />

        </div>

    );

}

export default ProfileSkeleton;