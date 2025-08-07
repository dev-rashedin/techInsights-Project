import { NavLink } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { NavItem } from '../../interface';



const Menu = ({ filteredItems } : {filteredItems : NavItem[]}) => {  

  return (
    <Fade cascade damping={0.3}>
      <ul className='lg:flex lg:items-center lg:gap-3 xl:text-lg space-y-4 lg:space-y-0 font-wendy tracking-wider xl:mt-1'>
        {filteredItems.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? '  border-2 rounded-lg border-green-lantern px-3 py-2 xl:text-lg'
                  : 'px-3 pb-1 hover:border-b-2 hover:rounded-xl border-green-lantern  hover:transition text-base'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </Fade>
  );
};


export default Menu;
