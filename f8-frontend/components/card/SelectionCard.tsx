import cardstyle from "./Card.module.scss";

const SelectionCard: any = ({
  children, cardClass, selected, onClick,
}: {
  children: React.ReactNode,
  cardClass: String,
  selected:Boolean
  onClick:any,
}) => {
  return <div onClick={onClick} className={` ${cardClass} ${cardstyle.selectioncard} ${ selected ? cardstyle.selected:""}`}>{children}</div>;
};

export default SelectionCard;
