import React, { useState, useEffect } from 'react';
import './styles.css';

function DevForm({ onSubmit }) {

    const [github_username, setGitHubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000
            }
        );

    }, []);


    async function handlerSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGitHubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handlerSubmit}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="username_github"
                    required
                    value={github_username}
                    onChange={e => setGitHubUsername(e.target.value)} />
            </div>
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)} />
            </div>
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        onChange={e => setLatitude(e.target.value)}
                        value={latitude}
                        required />
                </div>
                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        onChange={e => setLongitude(e.target.value)}
                        value={longitude}
                        required />
                </div>
            </div>
            <button type="submit" >Salvar</button>
        </form>
    );
}

export default DevForm;