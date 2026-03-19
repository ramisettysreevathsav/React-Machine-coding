// SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import useDebounce from "../CustomHooks/useDebounce";

const cache = {};

const SearchBar = () => {
    const [text, setText] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedText = useDebounce(text, 500);

    const abortRef = useRef();

    useEffect(() => {
        if (!debouncedText.trim()) {
            setResults([]);
            return;
        }

        if (cache[debouncedText]) {
            setResults(cache[debouncedText]);
            return;
        }

        abortRef.current?.abort();
        abortRef.current = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://dummyjson.com/products/search?q=${debouncedText}`,
                    { signal: abortRef.current.signal }
                );
                const data = await response.json();

                // ✅ store in cache
                cache[debouncedText] = data.products || [];
                setResults(cache[debouncedText]);
            } catch (err) {
                if (err.name === "AbortError") return;
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => abortRef.current?.abort();

    }, [debouncedText]);

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Search products..."
            />
            {loading && <p>Loading...</p>}
            <ul>
                {results.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;