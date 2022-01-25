import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Alerta from "./Alerta";

const Formulario = () => {

  const navigate = useNavigate();

  //Creando el schema
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string().min(3, 'El nombre es muy corto').required('El nombre del cliente es obligatorio'),
    empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
    email: Yup.string().required('El email es obligatorio').email('Email no válido'),
    telefono: Yup.number().integer('Número no válido').positive('Número no válido').typeError('Número no válido')
  })

  const handleSubmit = async values => {

    try {

      const url = 'http://localhost:4000/clientes';

      const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resultado = await respuesta.json();

      // console.log(resultado);

      navigate('/clientes');
      
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">

      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">Agregar Cliente</h1>

      <Formik

        initialValues={{
          nombre: '',
          empresa: '',
          email: '',
          telefono: '',
          notas: ''
        }}

        onSubmit={ async (values, {resetForm}) => {
          await handleSubmit(values);
          resetForm();
        }}

        validationSchema={nuevoClienteSchema}

      >

        {

          ({ errors, touched }) => {

            return (
              <Form
                className="mt-10"
              >

                <div className="mb-4">

                  <label
                    htmlFor="nombre"
                    className="text-gray-800"
                  >Nombre:</label>

                  <Field
                    id="nombre"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Nombre del cliente"
                    name="nombre"
                  />

                  {errors.nombre && touched.nombre ? (
                    <Alerta>{errors.nombre}</Alerta>
                  ) : null}

                </div>

                <div className="mb-4">

                  <label
                    htmlFor="empresa"
                    className="text-gray-800"
                  >Empresa:</label>

                  <Field
                    id="empresa"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Empresa del cliente"
                    name="empresa"
                  />

                  {errors.empresa && touched.empresa ? (
                    <Alerta>{errors.empresa}</Alerta>
                  ) : null}

                </div>

                <div className="mb-4">

                  <label
                    htmlFor="email"
                    className="text-gray-800"
                  >Email:</label>

                  <Field
                    id="email"
                    type="email"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Email del cliente"
                    name="email"
                  />

                  {errors.email && touched.email ? (
                    <Alerta>{errors.email}</Alerta>
                  ) : null}

                </div>

                <div className="mb-4">

                  <label
                    htmlFor="telefono"
                    className="text-gray-800"
                  >Telefono:</label>

                  <Field
                    id="telefono"
                    type="tel"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Telefono del cliente"
                    name="telefono"
                  />

                  {errors.telefono && touched.telefono ? (
                    <Alerta>{errors.telefono}</Alerta>
                  ) : null}

                </div>

                <div className="mb-4">

                  <label
                    htmlFor="notas"
                    className="text-gray-800"
                  >Notas:</label>

                  <Field
                    as="textarea"
                    id="notas"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-100 h-40"
                    placeholder="Notas del cliente"
                    name="notas"
                  />

                </div>

                <input
                  type="submit"
                  value="Agregar Cliente"
                  className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                />

              </Form>
            )

          }

        }

      </Formik>

    </div>
  )

};

export default Formulario;
