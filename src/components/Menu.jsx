import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Fade } from 'react-awesome-reveal';

const Menu = ({ filteredItems = [] }) => {  

  return (
    <Fade cascade damping={0.3}>
      <ul className='xl:flex xl:items-center xl:gap-3 xl:text-lg space-y-4 xl:space-y-0 font-wendy tracking-wider'>
       
        {filteredItems.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? '  border-2 rounded-lg border-deep-ocean px-3 py-2 xl:text-lg'
                  : 'px-3 hover:border-b-2 hover:rounded-xl border-green-lantern  hover:transition text-base'
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

Menu.propTypes = {
  items: PropTypes.array,
}

export default Menu;
