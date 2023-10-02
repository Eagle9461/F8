import cardstyle from "./Card.module.scss";

const Card: any = ({
  children, cardClass
}: {
  children: React.ReactNode;
  cardClass: String;
}) => {
  return <div className={`${cardClass} ${cardstyle.card}`}>{children}</div>;
};

export default Card;
