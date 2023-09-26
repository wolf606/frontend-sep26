"use client"
import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
const { logIn } = require("@utils/calls")
import styles from "./page.module.css"

import {SignupForm} from "@components/SignupForm"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 75,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export default function Signup() {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div className={styles.main}>
            <SignupForm setOpen={setOpen}></SignupForm>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: '80%', height: '80%', overflow: 'auto'  }}>
                    <h2 id="parent-modal-title">Terminos y Condiciones</h2>
                    <p id="parent-modal-description">
                    Por favor, lee detenidamente los siguientes términos y condiciones antes de utilizar nuestro sitio web. Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguno de los siguientes puntos, te recomendamos que no utilices nuestro sitio web.
                    </p>
                          {/* Section 1: Uso del Sitio Web */}
      <div>
        <h3>1. Uso del Sitio Web</h3>
        <p>
          <b>1.1. </b>El contenido de este sitio web es únicamente para información general y puede estar sujeto a cambios sin previo aviso. No garantizamos la exactitud, integridad o actualidad de la información proporcionada en este sitio web.
        </p>
        <p>
          <b>1.2. </b>El uso de cualquier información o material en este sitio web es bajo tu propio riesgo. Es tu responsabilidad asegurarte de que cualquier producto, servicio o información disponible a través de este sitio web cumpla con tus requisitos específicos.
        </p>
        <p>
          <b>1.3. </b>Este sitio web puede contener enlaces a otros sitios web que no están bajo nuestro control. No tenemos control sobre la naturaleza, el contenido y la disponibilidad de esos sitios. La inclusión de cualquier enlace no implica necesariamente una recomendación o respaldo de los puntos de vista expresados en ellos.
        </p>
      </div>

      {/* Section 2: Propiedad Intelectual */}
      <div>
        <h3>2. Propiedad Intelectual</h3>
        <p>
          <b>2.1. </b>Todos los derechos de propiedad intelectual en relación con este sitio web y su contenido (incluyendo, pero no limitado a, texto, gráficos, logotipos, imágenes y software) son propiedad de SENNOVALAB o de nuestros licenciantes. Estos están protegidos por las leyes de propiedad intelectual aplicables.
        </p>
        <p>
          <b>2.2. </b>Está prohibida cualquier reproducción, distribución, modificación o uso no autorizado del contenido de este sitio web sin nuestro consentimiento previo por escrito.
        </p>
      </div>

      {/* Section 3: Privacidad y Protección de Datos */}
      <div>
        <h3>3. Privacidad y Protección de Datos</h3>
        <p>
          <b>3.1. </b>La recopilación y el uso de tus datos personales en relación con este sitio web están sujetos a nuestra Política de Privacidad. Al utilizar nuestro sitio web, aceptas el procesamiento de tus datos personales de acuerdo con nuestra Política de Privacidad.
        </p>
      </div>

      {/* Section 4: Limitación de Responsabilidad */}
      <div>
        <h3>4. Limitación de Responsabilidad</h3>
        <p>
          <b>4.1. </b>En la medida permitida por la ley aplicable, excluimos todas las garantías y condiciones relacionadas con nuestro sitio web y su contenido. No seremos responsables de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso de este sitio web.
        </p>
      </div>

      {/* Section 5: Modificaciones de los Términos y Condiciones */}
      <div>
        <h3>5. Modificaciones de los Términos y Condiciones</h3>
        <p>
          <b>5.1. </b>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios serán efectivos tan pronto como se publiquen en este sitio web. Te recomendamos que revises regularmente estos términos y condiciones para estar al tanto de cualquier cambio.
        </p>
      </div>
                    <Button onClick={handleClose}>Cerrar</Button>
                </Box>
            </Modal>
        </div>
    )
}