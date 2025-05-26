import style from "./style.module.css";
const ContainerComponent = ({ children }: React.PropsWithChildren<object>) => {
    return <div className={style.container}>{children}</div>;
};

export default ContainerComponent;
