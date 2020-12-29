import styles from "./card.module.css";

function Index({ info }) {
  return (
    <div className={styles.main_card}>
      <img className={styles.card_image} src={info.Image} />
      <div className={styles.card_footer}>{info.name}</div>
    </div>
  );
}

export default Index;
