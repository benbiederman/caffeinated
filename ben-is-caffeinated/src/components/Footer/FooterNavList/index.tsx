import styles from "./FooterNavList.module.scss";

type NavListItem = {
  href: string;
  label: string;
};

type FooterNavListProps = {
  navList: NavListItem[];
  listHeader?: string;
  className?: string;
};

const FooterNavList = ({
  listHeader,
  navList,
  className,
}: FooterNavListProps) => {
  if (!navList || navList?.length === 0) return null;

  return (
    <div className={`${styles.container} ${className ? className : ""}`}>
      {listHeader && <h3>{listHeader}</h3>}
      <nav>
        <ul>
          {navList.map((item, index) => (
            <li key={index.toString()}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FooterNavList;
