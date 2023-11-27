import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function popMessage(title, icon, massage) {
  // "use strict";
  MySwal.fire({
    title: title,
    text: massage,
    icon: icon,
    showCancelButton: true,
  });
}

export default popMessage;
