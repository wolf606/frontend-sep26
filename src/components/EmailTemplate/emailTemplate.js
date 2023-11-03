import * as React from 'react';

const [user, setUser] = useState([]);

useEffect(() => {
    getUsers()
        .then(response => {
            setUsers(response);
            setCache(response);
        });
})


export const EmailTemplate = ({

}) => (
    <div>
        <h1>Welcome {user.name}</h1>

        <p>
            Thank you for signing up for our newsletter. We will send you
            an email every week with the latest news.
        </p>

        <button >Unsubscribe</button>
    </div>
);
