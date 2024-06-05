import { ScrollArea } from "@mantine/core";
import classes from "./NavbarNested.module.css";
import { LinkGroup } from "./link-group/LinkGroup";
import { MainRouter } from "../../routes/dashboard-routes/main-router";

export const Navbar = () => {

  const filteredRoutes = MainRouter.filter((item) =>
    item.accessRoles.includes("admin")
  );

  const links = filteredRoutes.map((item) => (
    <LinkGroup {...item} key={item.label} />
  ));
  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
};

export default Navbar;
