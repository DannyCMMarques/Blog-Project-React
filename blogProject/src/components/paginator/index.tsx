import React from "react";
import styles from "./style.module.css";

interface PaginadorProps {
    page: number;
    totalPages: number;
    onChange: (newPage: number) => void;
}

const Paginador: React.FC<PaginadorProps> = ({
    page,
    totalPages,
    onChange,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={styles.paginador}>
            <button
                className={styles.seta}
                onClick={() => onChange(page - 1)}
                disabled={page <= 1}
            >
                ‹
            </button>

            <ul className={styles.numeros}>
                {pages.map((p) => (
                    <li key={p}>
                        <button
                            className={`${styles.item} ${p === page ? styles.ativo : ""}`}
                            onClick={() => onChange(p)}
                        >
                            {p}
                        </button>
                    </li>
                ))}
            </ul>

            <button
                className={styles.seta}
                onClick={() => onChange(page + 1)}
                disabled={page >= totalPages}
            >
                ›
            </button>
        </div>
    );
};

export default Paginador;
