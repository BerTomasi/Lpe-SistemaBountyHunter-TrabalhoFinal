import React, { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import ServicosContext from "./ServicosContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();

console.log(uniqueId);


function Form() {
    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(ServicosContext);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            objeto.imgUrl = file;
            console.log("Imagem selecionada:", objeto.imgUrl);
        }
    };

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Serviço de Bounty Hunter"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtTitulo" label="Título"
                    tipo="text" name="titulo" value={objeto.titulo}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Titulo OK"
                    msginvalido="Informe o título" />
                <CampoEntrada id="txtCriatura" label="Criatura"
                    tipo="text" name="criatura" value={objeto.criatura}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Criatura OK"
                    msginvalido="Informe a criatura" />
                <CampoSelect
                    id="selectTipoServico" label="Tipo de Serviço"
                    idLabel="labelTipoServico"
                    tipo="text" name="tipoServico" value={objeto.tipoServico}
                    onchange={handleChange} requerido={true}
                    msgvalido="Tipo de Serviço OK"
                    msginvalido="Informe o tipo de serviço">
                    <MenuItem value='Captura'>Captura</MenuItem>
                    <MenuItem value='Neutralização'>Neutralização</MenuItem>
                    <MenuItem value='Outro'>Outro</MenuItem>
                </CampoSelect>
                <CampoEntrada id="txtLocalizacao" label="Localização"
                    tipo="text" name="localizacao" value={objeto.localizacao}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Localização OK"
                    msginvalido="Informe a localização" />
                <CampoEntradaTexto id="txtDescricao" label="Descrição do Serviço"
                    rows={5}
                    tipo="text" name="descricao"
                    value={objeto.descricao}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={500}
                    msgvalido="Descrição OK"
                    msginvalido="Informe a descrição" />
                <CampoEntrada
                    id="txtRecompensa"
                    label="Recompensa (Peças de ouro)"
                    tipo="text"
                    name="recompensa"
                    value={objeto.recompensa}
                    onchange={(e) => handleChange({
                        target: {
                            name: "recompensa",
                            value: e.target.value,
                        }
                    })}
                    mask="999.999,99"
                    required={true}
                    placeholder="Informe a recompensa"
                />
                <CampoEntrada id="txtContratante" label="Contratante"
                    tipo="text" name="contratante" value={objeto.contratante}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Contratante OK"
                    msginvalido="Informe o contratante" />
                <CampoEntrada
                    id="fileImagem"
                    label=""
                    tipo="file"
                    name="imagem"
                    onchange={handleImageChange}
                    requerido={true}
                    accept="image/png,image/jpeg"
                    readonly={false}
                    msgvalido="Imagem OK"
                    msginvalido="Selecione uma imagem para o serviço"
                />
            </Dialogo >
        </>
    );
}

export default Form;