import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Profile = () => {

    const { user } = useAuthContext();
    const BASE_URL = 'http://localhost:8430/api/profiles';

    const [profile, setProfile] = useState([]);
    const [err, setErr] = useState("");

    const [editing, setEditing] = useState(false);

    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');

    useEffect(() => {
        const createProfile = async () => {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setProfile(data.profile);
            }

            if (!res.ok) {
                const data = await res.json();
                setErr(data.error);
            }
        };

        createProfile();
    }, [user.token]);

    const handleClick = () => {
        setEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(BASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data.profile);

            setBio('');
            setLocation('');
            setWebsite('');
        }

        if (!res.ok) {
            const data = await res.json();
            console.log(data);
        }
    };

    return (
        <section className="flex flex-col gap-[80px] px-[5%]">
            {err && <div className="error">{err}</div>}

            <div className="flex flex-col gap-3">
                <h1>{user.email}</h1>
                <h1>{profile.bio}</h1>
                <h1>{profile.location}</h1>
                <a href={profile.website}>{profile.website}</a>
                <h1>{profile.profile_pic}</h1>

                <button className="bg-green-400 py-2 px-5 rounded text-white" onClick={handleClick}>Update Profile</button>
            </div>

            {editing && (
                <div>
                    <h1 className="font-bold mb-3">Update Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="">Profile Pic</label>
                            <input type="file" id="" />
                        </div>
                        <label htmlFor="">Bio:</label>
                        <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} id="" />

                        <label htmlFor="">Location:</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} id="" />

                        <label htmlFor="">Website:</label>
                        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} id="" />

                        <button type="submit">Update</button>
                    </form>
                </div>
            )}
        </section>
    )
}

export default Profile
