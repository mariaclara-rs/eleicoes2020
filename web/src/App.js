import React, { useState } from 'react';
import api from './servicos/api';
import './global.css';
import './form.css';
import './main.css';
import { useEffect } from 'react';

function App() {
  const [nome, setNome] = useState('');
  const [dataNasc, setdataNasc] = useState('');
  const [email, setEmail] = useState('');
  const [fone, setFone] = useState('');
  const [cep, setCEP] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUF] = useState('');
  const [rua, setRua] = useState('');
  const [num, setNum] = useState('');
  const [bairro, setBairro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cpf, setCPF] = useState('');
  const [numTitulo, setTitulo] = useState('');
  const [partido, setPartido] = useState('');
  const [candidatos, setCandidatos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [alterando, setAlterando] = useState(false); 
  const [botao, setBotao] = useState('Cadastrar'); 
 
  async function carregarCandidatos(){
    const response = await api.get('/candidatos');
    setCandidatos(response.data);
  }
  useEffect(()=>{
    carregarCandidatos();},[]);

  function validaIdade(){
    if(dataNasc == ""){
        return false;
    }
    let now = new Date();
    let vet = dataNasc.split("-");


    let ano = vet[0];
    let mes = vet[1];
    let dia = vet[2];


    if(now.getFullYear() - ano > 18) return true;
    if(now.getFullYear() - ano == 18){
        if((mes-1) > now.getMonth() || ((mes-1) == now.getMonth() && dia > now.getDate())){
            return false;
        }
        return true;
    }
    return false;   
    
  }

  function validaEmail(){
    const formato = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return formato.test(email);
  }

  function validaTelefone(){
    return /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g.test(fone);
  }

  function validaCEP(){

    return /()/g.test(cep);
  }

  function validaEntradas(){
    if(nome.length<5){
      setMensagem("Campo Nome deve ser preenchido com pelo menos 5 caracteres");
   
    }
    else if(!validaIdade()){
      setMensagem("Um candidato deve ter pelo menos 18 anos");
    }
    else if(email.length==0)
      setMensagem("Campo E-mail deve ser preenchido!");
    else if(!validaEmail()){
      setMensagem("E-mail inválido!");
 
    }
    else if(fone.length==0)
      setMensagem("Campo Telefone deve ser preenchido!");
    else if(!validaTelefone()){
      setMensagem("Telefone inválido!");

    }
    else if(cep.length==0)
      setMensagem("Campo CEP deve ser preenchido!");
    else if(!validaCEP()){
      setMensagem("CEP inválido");

    }
    else if(cpf.length<11)
      setMensagem("Campo CPF deve ser preenchido com pelos 11 caracteres!");
    else if(numTitulo.length<12)
      setMensagem("Campo Titulo de eleitor deve ser preenchido com pelos 12 caracteres!");
    else{
      setMensagem("Mensagens de erro ao preencher o formulário aparecerão aqui");
      return true;
    }
      
    return false;
  }

  async function adicionarCandidatos(e){

    e.preventDefault();
    if(validaEntradas()){
      if(!alterando)
      {
        const response = await api.post('/candidatos',{
          cpf,
          numTitulo,
          nome, 
          dataNasc,
          fone,
          email,
          partido,
          cep,
          cidade,
          uf,
          rua,
          num,
          bairro,
          complemento

        })
        if(response.data!=null)
          setCandidatos([...candidatos,response.data]);
        else
          alert("CPF já cadastrado!");
      }
      else{
        const response = await api.put('/candidatos',{
          cpf,
          numTitulo,
          nome, 
          dataNasc,
          fone,
          email,
          partido,
          cep,
          cidade,
          uf,
          rua,
          num,
          bairro,
          complemento
        });
        setBotao('Cadastrar');
        carregarCandidatos();
        setAlterando(false);
      }
      setCPF('');
          setTitulo('');
          setNome('');
          setdataNasc('');
          setFone('');
          setEmail('');
          setPartido('');
          setCEP('');
          setCidade('');
          setUF('');
          setRua('');
          setNum('');
          setBairro('');
          setComplemento('');
    }
  }

  async function Alterar(candidato){
    setCPF(candidato.cpf);
    setTitulo(candidato.numTitulo);
    setNome(candidato.nome);
    setdataNasc(candidato.dataNasc);
    setFone(candidato.fone);
    setEmail(candidato.email);
    setPartido(candidato.partido);
    setCEP(candidato.cep);
    setCidade(candidato.cidade);
    setUF(candidato.uf);
    setRua(candidato.rua);
    setNum(candidato.num);
    setBairro(candidato.bairro);
    setComplemento(candidato.complemento);
    setAlterando(true);
    setBotao('Alterar')
  }

  async function Excluir(cpf){
    const cand = await api.delete('/candidatos/'+cpf);
    if(cand){
      alert("Excluido com sucesso")
      setCandidatos(candidatos.filter(candidato => candidato.cpf !== cpf));
    }
  }


  return (
    <div id="app">
      <aside id="area-form">
        <h2>Cadastro de Candidatos</h2>
        <form onSubmit={adicionarCandidatos}>
        { /* nome, data nascimento e foto*/ }
          <div className="nome_secao"><span>1</span>Pessoal</div>
          <div className="campos_secao">
            <label>Nome Completo <input type="text" name="nome" id="nome" value={nome} onChange={e=> setNome(e.target.value)}/></label>
            <label>Data de Nascimento <input type="date" name="dataNasc" id="dataNasc" value={dataNasc} onChange={e=> setdataNasc(e.target.value)}/></label>
            <label>Foto <input className="foto" type="file" name="foto" id="foto"  /></label>
          </div>
        { /* email e telefone*/ }
          <div className="nome_secao"><span>2</span>E-mail e Telefone</div>
          <div className="campos_secao">
            <label>E-mail <input type="email" name="email" id="email" value={email} onChange={e=> setEmail(e.target.value)} /></label>
            <label>Telefone <input type="text" name="fone" id="fone" value={fone} onChange={e=> setFone(e.target.value)}/></label>
          </div>
        { /* Endereço*/ }
          <div className="nome_secao"><span>3</span>Endereço</div>
          <div className="campos_secao">
            <label>CEP <input type="text" name="cep" id="cep" value={cep} onChange={e=> setCEP(e.target.value)}/></label>
            
            <div className="divide_secao1">
             <label>Cidade <input type="text" name="cidade" id="cidade" value={cidade} onChange={e=> setCidade(e.target.value)}/></label>
            </div>
            <div className="divide_secao2">
             <label>UF <input type="text" name="uf" id="uf" value={uf} onChange={e=> setUF(e.target.value)}/></label>
            </div>

            <div className="divide_secao1">
             <label>Rua <input type="text" name="rua" id="rua" value={rua} onChange={e=> setRua(e.target.value)}/></label>
            </div>
            <div className="divide_secao2">
             <label>Número <input type="text" name="num" id="num" value={num} onChange={e=> setNum(e.target.value)}/></label>
            </div>

            <label>Bairro <input type="text" name="bairro" id="bairro" value={bairro} onChange={e=> setBairro(e.target.value)}/></label>
            <label>Complemento <input type="text" name="complemento" id="complemento" value={complemento} onChange={e=> setComplemento(e.target.value)}/></label>
          </div>
          { /**/ }
          <div className="nome_secao"><span>4</span>Identidade e Partido</div>
          <div className="campos_secao">
            <label>CPF <input type="text" name="cpf" id="cpf" value={cpf} onChange={e=> setCPF(e.target.value)}/></label>
            <label>Título de Eleitor <input type="text" name="titulo" id="titulo" value={numTitulo} onChange={e=> setTitulo(e.target.value)}/></label>
            <label>Partido <input type="text" name="partido" id="partido" value={partido} onChange={e=> setPartido(e.target.value)}/></label>
          </div>

          <input id="bt_Cadastrar" type="submit" name="Cadastrar" value={botao}/>
        </form>
        <div className="msg" name="mensagem">{
                    mensagem
                }</div>
      </aside>
      <main>
        <h2>Lista de Candidatos</h2>
        <ul className="nossaGrid">
          {candidatos.map(candidato=>(
              <li className="item-candidato">
                <header>
                <div id="botoes">
                  <button id="Alterar" type="button" onClick={()=>Alterar(candidato)}>
                    <img src="https://image.flaticon.com/icons/png/512/23/23187.png" alt="editar"></img>
                  </button>
                  <button id="Excluir" type="button" onClick={()=>Excluir(candidato.cpf)}>
                    <img src="https://image.flaticon.com/icons/png/512/1175/1175088.png" alt="excluir"></img>
                  </button>
                </div>
                    <img src="https://www.jornalterceiravia.com.br/wp-content/uploads/2020/07/POL%C3%8DTICO.png" alt="candidato"></img>
                    <strong>{candidato.nome}</strong>
                    <span>{candidato.partido}</span>
                    <p>{candidato.cidade}-{candidato.uf}</p>
                </header>
                
              </li>
          ))}
        </ul>
      </main>

    </div>
  );
}

export default App;
