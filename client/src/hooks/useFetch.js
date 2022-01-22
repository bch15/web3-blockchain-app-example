import { useEffect, useState } from "react";

const API_KEY = import.meta.VITE_GIPHY_API;

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState('');

    const fetchGiphs = async () => {
        try {
            const response = await fetch(`api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const { data } = await response.json();

            //?. bara ine ke undifined bede na Error
            setGifUrl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            setGifUrl('https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif')
        }
    }

    useEffect(() => {
        if (keyword) fetchGiphs();
    }, [keyword])

    return gifUrl;
}

export default useFetch;