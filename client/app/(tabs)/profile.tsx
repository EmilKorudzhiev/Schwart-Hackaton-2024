import { useAuth } from "@/providers/AuthProvider";
import { Button } from "react-native";

const Profile = () => {
    const {signOut} = useAuth();

    return (
        <Button title="SignOut" onPress={signOut}/>
    )
}

export default Profile;