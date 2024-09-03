import styles from "../css modules/loader.module.css";
function Loader() {
  return (
    <div
      className={`${styles.light} w-fit text-6xl text-[--mainColor] overflow-hidden`}
    >
      LOADING..
    </div>
  );
}

export default Loader;
