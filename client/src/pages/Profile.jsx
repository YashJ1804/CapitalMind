import { useState } from "react";

import AppLayout from "../layouts/AppLayout";

import { useAuth } from "../context/AuthContext";

import ChangePasswordModal from "../components/ChangePasswordModal/ChangePasswordModal";

import AccountHeader from "../components/profile/AccountHeader/AccountHeader";
import UserInformation from "../components/profile/UserInformation/UserInformation";
import AccountStats from "../components/profile/AccountStats/AccountStats";
import SecurityCard from "../components/profile/SecurityCard/SecurityCard";
import ProfileSkeleton from "../components/profile/ProfileSkeleton/ProfileSkeleton";

export default function Profile() {

    const { user } = useAuth();

    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Future backend integration
    const loading = false;

    const stats = {
        totalAnalyses: 0,
        totalWatchlist: 0,
        portfolioHoldings: 0,
        averageScore: 0
    };

    if (loading) {

        return (

            <AppLayout>

                <ProfileSkeleton />

            </AppLayout>

        );

    }

    return (

        <AppLayout>

            <div className="space-y-8">

                <AccountHeader

                    user={user}

                />

                <AccountStats

                    stats={stats}

                />

                <UserInformation

                    user={user}

                />

                <SecurityCard

                    onChangePassword={() =>
                        setShowPasswordModal(true)
                    }

                />

                {

                    showPasswordModal && (

                        <ChangePasswordModal

                            onClose={() =>
                                setShowPasswordModal(false)
                            }

                        />

                    )

                }

            </div>

        </AppLayout>

    );

}