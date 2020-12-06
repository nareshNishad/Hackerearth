import "./card.modules.css";

function Index({ info, clicked }) {
  return (
    <div className="main_card">
      <img className="card_image" src={info.Image} />
      <span className={clicked ? "selected" : "not_selected"}>
        <img src="http://icons.iconarchive.com/icons/icojam/blue-bits/24/symbol-check-icon.png" />
      </span>
      <div className="card_footer">
        <p>{info.name}</p>
      </div>
    </div>
  );
}

export default Index;
