import style from "./Card.module.scss";

const Card: any = ({
  children, cardClass
}: {
  children: React.ReactNode;
  cardClass: String;
}) => {
  return <div className={`${cardClass} ${style.nodecard}`}>{children}</div>;
};

export default Card;
