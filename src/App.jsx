import { Route, Routes, Navigate } from "react-router-dom";
import ReactDOMServer from 'react-dom/server';
import 'bootstrap/dist/css/bootstrap.min.css';
import ObrasPage from "./pages/obras/ObrasPage";
import ObrasForm from "./pages/obras/ObrasForm";
import MaterialesPage from "./pages/materiales/MaterialesPage";
import EmpleadosPage from "./pages/empleados/EmpleadosPage";
import ClientPage from "./pages/clientes/ClientPage";
import MaterialesForm from "./pages/materiales/MaterialesForm";
import EmpleadosForm from "./pages/empleados/EmpleadosForm";
import ClientForm from "./pages/clientes/ClientForm";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { CategoriaContextProvider } from "./context/categorias/CategoriasProvider";
import { EspecialidadContextProvider } from "./context/especialidades/EspecialidadesProvider";
import { MaterialContextProvider } from "./context/materiales/MaterialesProvider";
import { ObraContextProvider } from "./context/obras/ObrasProvider";
import { EmpleadoContextProvider } from "./context/empleados/EmpleadosProvider";
import { ProveedorContextProvider } from './context/proveedores/ProveedorProvider'
import { ClientContextProvider } from "./context/clientes/ClientesProvider";
import { CompraContextProvider } from './context/compras/ComprasProvider'
import { RolContextProvider } from "./context/roles/RolesProvider";
import { PermisoContextProvider } from "./context/permisos/PermisosProvider";
import { DashboardContextProvider } from "./context/dashboard/DashboardProvider";
import ProveedoresPage from './pages/proveedores/ProveedorPage'
import ProveedoresForm from "./pages/proveedores/ProveedoresForm";
import RolesForm from "./pages/roles/RolesForm";
import RolesPage from "./pages/roles/RolesPage";
import PermisosPage from "./pages/permisos/PermisosPage";
import ComprasPage from "./pages/compras/ComprasPage";
import ComprasForm from "./pages/compras/ComprasForm";
import Sidebar from "./components/navegacion/Sidebar";
import EspecialidadesPage from "./pages/especialidades/EspecialidadesPage";
import EspecialidadesForm from "./pages/especialidades/EspecialidadesForm";
import CategoriasPage from "./pages/categorias/CategoriasPage";
import CategoriasForm from "./pages/categorias/CategoriasForm";
import Navbar from "./components/navegacion/Navbar"
import DetalleCompra from "./pages/compras/DetalleCompra";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ObraDetalle from "./pages/obras/ObrasDetalle";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Welcome from "./pages/Welcome";
const EmailModal = ({ isOpen, toggle, onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Olvidé mi contraseña</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Correo electrónico</Label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </FormGroup>
          <Button type="submit" color="primary">Enviar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};
const CodeModal = ({ isOpen, toggle, onSubmit }) => {
  const [code, setCode] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Código de verificación.</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>Se ha enviado un código de confirmación al correo ingresado</label>
            <input
              type="text"
              placeholder="ingrese su código"
              className="code form-control"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">Enviar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}
const PasswordModal = ({ isOpen, toggle, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%^&*]).{8,20}$/;

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    } else if (password.length > 20) {
      setError('La contraseña no debe tener más de 20 caracteres.');
      return;
    } else if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.');
      return;
    } else if (!passwordRegex.test(password)) {
      setError('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    } else {
      // Llamar a la función onSubmit con la contraseña y el correo electrónico
      onSubmit(password);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Cambio de Contraseña</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ingrese su nueva contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su nueva contraseña"
              className="password form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirme su nueva contraseña</label>
            <input
              type="password"
              placeholder="Confirme su nueva contraseña"
              className="passwordconfirm form-control"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <Button type="submit" color="primary">Enviar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};





function App() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const handleOpenEmailModal = () => {
    setEmailModalOpen(true);
  };

  const handleCloseEmailModal = () => {
    setEmailModalOpen(false);
  };

  const handleOpenCodeModal = () => {
    setCodeModalOpen(true);
  };

  const handleCloseCodeModal = () => {
    setCodeModalOpen(false);
  };

  const handleOpenPasswordModal = ()=>{
    setPasswordModalOpen(true)
  }

  const handleClosePasswordModal = ()=>{
    setPasswordModalOpen(false)
  }

  const handleEmailSubmit = async (email) => {
    try {
      const response = await fetch('https://apismovilconstru-production-be9a.up.railway.app/sendCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      localStorage.setItem('email',email)
      if (response.status === 200) {

        setEmailModalOpen(false); // Cierra la ventana modal de correo electrónico

        handleOpenCodeModal()


      } else {
        // Si hubo algún error al enviar el correo electrónico, muestra un mensaje de error
        $.alert("Correo eletronico invalido.")
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  const handleCodeSubmit = async (code) => {
    try {
      const currentDate = new Date().toISOString().replace('T', ' ').split('.')[0];
      const response = await fetch('https://apismovilconstru-production-be9a.up.railway.app/checkCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, date: currentDate }),
      });

      if (response.status === 200) {
        handleCloseCodeModal()
        handleOpenPasswordModal()
      } else if (response.status === 203) {

        $.alert(`El código ingresado ha excedido el tiempo máximo (15 minutos) para ser ingresado`)
      } else if (response.status === 404) {
        // El código es inválido
        $.alert(`Código invalido`)
      } else {
        // Manejar otros casos de error si es necesario
        $.alert(`Error al validar el codigo`)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  const handlePasswordSubmit = async (password) => {
    try {
      const email = localStorage.getItem('email');
      console.log("username: ", localStorage.getItem('email'));
      // Definir la función fetch como una promesa
      const fetchPromise = fetch('https://apismovilconstru-production-be9a.up.railway.app/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email }),
      });
  
      // Definir una promesa de tiempo de espera
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Tiempo de espera excedido'));
        }, 5000); // 5000 milisegundos = 5 segundos (puedes ajustar este valor según tus necesidades)
      });
  
      // Utilizar Promise.race para ejecutar la solicitud fetch y el tiempo de espera al mismo tiempo
      const response = await Promise.race([fetchPromise, timeoutPromise]);
  
      
  
      if (response.ok) {
        console.log('Contraseña cambiada exitosamente');
        handleClosePasswordModal()
      } else {
        console.error('Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  


  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });

  const [email, setEmail] = useState('')


  const handleLogin = () => {

    setLoggedIn(true)
    navigate('/')
  }

  const handleLogout = () => {

    $.confirm({
      title: `Desea salir de la aplicación ?`,
      content: "",
      icon: 'fa fa-question-circle',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 500,
      type: 'red',
      columnClass: 'col-md-6 col-md-offset-3',
      buttons: {
        confirmar: {
          btnClass: 'btn-danger',
          action: async function () {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            setLoggedIn(false)
            navigate('/signin')
          }
        },
        cancelar: {
          btnClass: 'btn-default',
          action: function () {
            $.alert('Acción cancelada!');
          }
        }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('https://apismovilconstru-production-be9a.up.railway.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })
      if (response.status === 404) {
        $.confirm({
          title: 'Credenciales incorrectas',
          content: "Usuario inactivo o credenciales incorrectas...",
          icon: 'fa fa-x-mark',
          theme: 'modern',
          closeIcon: true,
          animation: 'zoom',
          closeAnimation: 'scale',
          animationSpeed: 500,
          type: 'red',
          columnClass: 'col-md-6 col-md-offset-3',
          buttons: {
            cerrar: function () {
            },
          }
        })

      } else if (response.status === 200) {
        try {

          const data = await response.json();
          localStorage.setItem('token', data.token)
          const token = localStorage.getItem('token')
          const [header, payload, signature] = token.split('.');
          const decodedToken = JSON.parse(atob(payload));
          if (decodedToken) {
            localStorage.setItem('userData', JSON.stringify(decodedToken));
            const userData = JSON.parse(localStorage.getItem('userData'))
            $.confirm({
              title: 'Inicio de sesión con exito!',
              content: `Bienvenido ${userData.nombres}`,
              icon: 'fa fa-check',
              theme: 'modern',
              closeIcon: true,
              animation: 'zoom',
              closeAnimation: 'scale',
              animationSpeed: 1500,
              type: 'green',
              columnClass: 'col-md-6 col-md-offset-3',
              autoClose: 'okay|4000',
              buttons: {
                okay: function () {
                  navigate("/")
                },
              }
            })
            handleLogin()
            setUsername('')
            setPassword('')
          } else {
            console.log('No se pudo codificar el token')
          }

        } catch (error) {
          console.log("Error al decodificar el token:", error)
        }
      } else {
        console.log("Error al iniciar sesión")
      }

    } catch (error) {
      console.log(error)
    }
  }





  

  const handleCodeDialog = async (data) => {
    await new Promise((resolve, reject) => {
      showPasswordDialog((password, passwordConfirm) => {
        resolve({ data, password, passwordConfirm });
      });
    });
  };

  const showPasswordDialog = async (onSubmit) => {
    const formHtml = ReactDOMServer.renderToString(<PasswordForm onSubmit={onSubmit} />);

    $.confirm({
      title: 'Cambio de contraseña',
      content: formHtml,
      icon: 'fa fa-user-lock',
      theme: 'modern',
      closeIcon: true,
      animation: 'zoom',
      closeAnimation: 'scale',
      animationSpeed: 500,
      type: 'blue',
      columnClass: 'col-md-6 col-md-offset-3',
      buttons: {
        formSubmit: {
          text: 'Enviar',
          btnClass: 'btn-blue',
          action: async function () {
            var password = this.$content.find('.password').val();
            var passwordConfirm = this.$content.find('.passwordconfirm').val();

            if (!password || !passwordConfirm) {
              $.alert('Por favor ingrese contraseña y confirme su contraseña');
              return false;
            } else if (password !== passwordConfirm) {
              $.alert('Las contraseñas no coinciden');
              return false;
            }

            try {
              const email = localStorage.getItem('email')
              const response = await fetch('https://apismovilconstru-production-be9a.up.railway.app/password', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, passwordConfirm })
              });

              if (response.status === 200) {
                $.alert('Cambio de contraseña exitoso!');
              } else if (response.status === 404) {
                $.alert('Error, el correo ingresado no existe.');

              }
            } catch (error) {
              console.log(error);
            }
          },
        },
        cancelar: function () {

        },
      },
      onContentReady: function () {
        // bind to events
        var jc = this;
        this.$content.find('form').on('submit', function (e) {
          e.preventDefault();
          jc.$$formSubmit.trigger('click');
        });
      },
    });
  };

  const handlePasswordDialog = () => {
    showPasswordDialog(async (password, passwordConfirm) => {
      try {
        const response = await fetch('https://apismovilconstru-production-be9a.up.railway.app/password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password, passwordConfirm })
        })

        if (response.status === 200) {


        } else if (response.status === 404) {
          $.alert('Error, no se pudo cambiar la contraseña.');
        }

      } catch (error) {
        console.log(error)
      }
    });
  };

  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const tienePermisos = (requiredPermisos) => {
    if (!userData || !userData.rolesPermisos) {
      return false;
    }

    const permisosUsuario = userData.rolesPermisos.map(
      (rolPermiso) => String(rolPermiso.permiso.permiso).toLowerCase()
    );

    return requiredPermisos.every((permiso) => permisosUsuario.includes(permiso));
  };

  const redirectToDashboard = (route) => {
    const state = { redirected: true, from: route }

    return <Navigate to="/" replace state={state} />
  }
  return (
    <>
      {loggedIn ? (
        <div id="page-top">
          <div className="" id="wrapper">
            <Sidebar userData={JSON.parse(localStorage.getItem('userData'))} />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Navbar handleLogout={handleLogout} userData={JSON.parse(localStorage.getItem('userData'))} />
                <div className="container-fluid">
                  <DashboardContextProvider>
                    <Routes>
                      <Route path="/dashboard" element={
                        tienePermisos(['dashboard']) ? (
                          <DashboardPage />
                        ) : (
                          redirectToDashboard('dashboard')
                        )
                      } />
                      <Route path="/" element={<Welcome userData={userData.nombres} />} />
                    </Routes>
                  </DashboardContextProvider>
                  <ObraContextProvider>
                    <Routes>

                      <Route path="/obras" element={
                        tienePermisos(['obras']) ? (
                          <ObrasPage />
                        ) : (
                          redirectToDashboard('obras')
                        )
                      } />
                      <Route path="/agregarObra" element={
                        tienePermisos(['obras']) ? (
                          <ObrasForm />
                        ) : (
                          redirectToDashboard('obras')
                        )
                      } />
                      <Route path="/editarObra/:id" element={
                        tienePermisos(['obras']) ? (
                          <ObrasForm />
                        ) : (
                          redirectToDashboard('obras')
                        )
                      } />
                      <Route path="/detalleObra/:id" element={
                        tienePermisos(['obras']) ? (
                          <ObraDetalle />
                        ) : (
                          redirectToDashboard('obras')
                        )
                      } />
                    </Routes>
                  </ObraContextProvider>
                  <MaterialContextProvider>
                    <Routes>
                      <Route path="/materiales" element={
                        tienePermisos(['materiales']) ? (
                          <MaterialesPage />
                        ) : (
                          redirectToDashboard('materiales')
                        )
                      } />
                      <Route path="/agregarMaterial" element={
                        tienePermisos(['materiales']) ? (
                          <MaterialesForm />
                        ) : (
                          redirectToDashboard('materiales')
                        )
                      } />
                      <Route path="/editarMaterial/:id" element={
                        tienePermisos(['materiales']) ? (
                          <MaterialesForm />
                        ) : (
                          redirectToDashboard('materiales')
                        )
                      } />
                    </Routes>
                  </MaterialContextProvider>
                  <EmpleadoContextProvider>
                    <Routes>
                      <Route path="/empleados" element={
                        tienePermisos(['empleados']) ? (
                          <EmpleadosPage />
                        ) : (
                          redirectToDashboard('empleados')
                        )
                      } />
                      <Route path="/agregarEmpleado" element={
                        tienePermisos(['empleados']) ? (
                          <EmpleadosForm />
                        ) : (
                          redirectToDashboard('empleados')
                        )
                      } />
                      <Route path="/editarEmpleado/:id" element={
                        tienePermisos(['empleados']) ? (
                          <EmpleadosForm />
                        ) : (
                          redirectToDashboard('empleados')
                        )
                      } />
                    </Routes>
                  </EmpleadoContextProvider>
                  <EspecialidadContextProvider>
                    <Routes>
                      <Route path="/especialidades" element={
                        tienePermisos(['especialidades']) ? (
                          <EspecialidadesPage />
                        ) : (
                          redirectToDashboard('especialidades')
                        )
                      } />
                      <Route path="/agregarEspecialidad" element={
                        tienePermisos(['especialidades']) ? (
                          <EspecialidadesForm />
                        ) : (
                          redirectToDashboard('especialidades')
                        )
                      } />
                      <Route path="/editarEspecialidad/:id" element={
                        tienePermisos(['especialidades']) ? (
                          <EspecialidadesForm />
                        ) : (
                          redirectToDashboard('especialidades')
                        )
                      } />
                    </Routes>
                  </EspecialidadContextProvider>
                  <CategoriaContextProvider>
                    <Routes>
                      <Route path="/categorias" element={
                        tienePermisos(['categorias']) ? (
                          <CategoriasPage />
                        ) : (
                          redirectToDashboard('categorias')
                        )
                      } />
                      <Route path="/agregarCategoria" element={
                        tienePermisos(['categorias']) ? (
                          <CategoriasForm />
                        ) : (
                          redirectToDashboard('categorias')
                        )
                      } />
                      <Route path="/editarCategoria/:id" element={
                        tienePermisos(['categorias']) ? (
                          <CategoriasForm />
                        ) : (
                          redirectToDashboard('categorias')
                        )
                      } />
                    </Routes>
                  </CategoriaContextProvider>
                  <ProveedorContextProvider>
                    <Routes>
                      <Route path="/proveedores" element={
                        tienePermisos(['proveedores']) ? (
                          <ProveedoresPage />
                        ) : (
                          redirectToDashboard('proveedores')
                        )
                      }></Route>
                      <Route path="/agregarProveedor" element={
                        tienePermisos(['proveedores']) ? (
                          <ProveedoresForm />
                        ) : (
                          redirectToDashboard('proveedores')
                        )
                      }></Route>
                      <Route path="/editarProveedor/:id" element={
                        tienePermisos(['proveedores']) ? (
                          <ProveedoresForm />
                        ) : (
                          redirectToDashboard('proveedores')
                        )
                      }></Route>
                    </Routes>
                  </ProveedorContextProvider>
                  <ClientContextProvider>
                    <Routes>
                      <Route path="/clientes" element={
                        tienePermisos(['clientes']) ? (
                          <ClientPage />
                        ) : (
                          redirectToDashboard('clientes')
                        )
                      }></Route>
                      <Route path="/agregarCliente" element={
                        tienePermisos(['clientes']) ? (
                          <ClientForm />
                        ) : (
                          redirectToDashboard('clientes')
                        )
                      }></Route>
                      <Route path="/editarCliente/:id" element={
                        tienePermisos(['clientes']) ? (
                          <ClientForm />
                        ) : (
                          redirectToDashboard('clientes')
                        )
                      }></Route>
                      {/* <Route path="/login" element={<LoginPage />}></Route> */}
                    </Routes>
                  </ClientContextProvider>
                  <CompraContextProvider>
                    <Routes>
                      <Route path="/compras" element={
                        tienePermisos(['compras']) ? (
                          <ComprasPage />
                        ) : (
                          redirectToDashboard('compras')
                        )
                      }></Route>
                      <Route path="/agregarCompras" element={
                        tienePermisos(['compras']) ? (
                          <ComprasForm />
                        ) : (
                          redirectToDashboard('compras')
                        )
                      }></Route>
                      <Route path="/compra/:id" element={
                        tienePermisos(['compras']) ? (
                          <DetalleCompra />
                        ) : (
                          redirectToDashboard('compras')
                        )
                      }></Route>
                    </Routes>
                  </CompraContextProvider>
                  <RolContextProvider>
                    <Routes>
                      <Route path="/roles" element={
                        tienePermisos(['roles']) ? (
                          <RolesPage />
                        ) : (
                          redirectToDashboard('roles')
                        )
                      } />
                      <Route path="/agregarRol" element={
                        tienePermisos(['roles']) ? (
                          <RolesForm />
                        ) : (
                          redirectToDashboard('roles')
                        )
                      } />
                      <Route path="/editarRol/:id" element={
                        tienePermisos(['roles']) ? (
                          <RolesForm />
                        ) : (
                          redirectToDashboard('roles')
                        )
                      } />
                    </Routes>
                  </RolContextProvider>
                  <PermisoContextProvider>
                    <Routes>
                      <Route path="/permisos" element={
                        tienePermisos(['permisos']) ? (
                          <PermisosPage />
                        ) : (
                          redirectToDashboard('permisos')
                        )
                      } />
                    </Routes>
                  </PermisoContextProvider>
                  {/* <UsuariosContextProvider>
                  <Routes>

                  </Routes>
                </UsuariosContextProvider>  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>Constru-tech</title>
            <link
              href="src/assets/vendor/fontawesome-free/css/all.min.css"
              rel="stylesheet"
              type="text/css"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
              rel="stylesheet"
            />
            <link href="src/assets/css/template/sb-admin-2.css" rel="stylesheet" />
            <div className="container">

              <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                  <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                        <div className="col-lg-6">
                          <div className="p-5">
                            <div className="text-center">
                              <h1 className="h4 text-gray-900 mb-4">Iniciar sesión</h1>
                            </div>
                            <form className="user" onSubmit={handleSubmit}>
                              <div className="form-group">
                                <label htmlFor="correo"></label>
                                <input
                                  type="email"
                                  className="form-control form-control-user"
                                  id="correo"
                                  onChange={(e) => setUsername(e.target.value)}
                                  value={username}
                                  aria-describedby="emailHelp"
                                  placeholder="Ingrese el correo electrónico"
                                  required
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="contrasena"></label>
                                <input
                                  type="password"
                                  className="form-control form-control-user"
                                  onChange={(e) => setPassword(e.target.value)}
                                  value={password}
                                  id="contrasena"
                                  placeholder="Ingrese la contraseña"
                                  required
                                />
                              </div>
                              <button type="submit" className="btn btn-primary btn-user btn-block">
                                Ingresar
                              </button>
                              <hr />
                            </form>
                            <div className="text-center">
                              <Button color="none"style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none' }} onClick={handleOpenEmailModal}>¿Olvidó su contraseña?</Button>
                              <EmailModal isOpen={emailModalOpen} toggle={handleCloseEmailModal} onSubmit={handleEmailSubmit} />
                            </div>
                            <CodeModal isOpen={codeModalOpen} toggle={handleCloseCodeModal} onSubmit={handleCodeSubmit} />
                            <PasswordModal isOpen={passwordModalOpen} toggle={handleClosePasswordModal} onSubmit={handlePasswordSubmit} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )
      }
    </>
  );
}

export default App