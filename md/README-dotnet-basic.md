`k8s-docker-iac-labs/md/README-dotnet-basic.md` - Go Language Basic Programming

## 1. Introdução

Este documento contém os artefatos do laboratório **LAB-12: DotNet Basic Programming** abaixo do projeto [k8s-docker-iac-labs](../README.md). Este laboratório consiste em:
* Explorar os recursos e funcionalidades básicas 

##### Table of Contents  
- [1. Introdução](#1-introdução)
- [2. Documentação](#2-documentação)
  * [2.1. Diagrama de Caso de Uso (Use Case Diagram)](#21-diagrama-de-caso-de-uso-use-case-diagram)
  * [2.2. Diagrama de Implantação (Deploy Diagram)](#22-diagrama-de-implantação-deploy-diagram)
  * [2.9. Glossário de Termos (Glossary)](#29-glossário-de-termos-glossary)
- [3. Projeto / Laboratório](#3-projeto--laboratório)
  * [3.1. Pré-Requisitos, Pré-Condições e Premissas](#31-pré-requisitos-pré-condições-e-premissas)
    + [a. Tecnologias e ferramentas](#a-tecnologias-e-ferramentas)
    + [b. Ferramental de apoio](#b-ferramental-de-apoio)
  * [3.3. Guia de Implantação, Configuração e Instalação](#33-guia-de-implantação-configuração-e-instalação)
    + [3.3.1. Instalar NET 6.0 SDK](#331-instalar-net-60-sdk)
  * [3.5. Guia de Estudo](#35-guia-de-estudo)
    + [3.5.1. Criar aplicação Hello World](#351-criar-aplicação-hello-world)
    + [3.5.2. Criar uma classe Bye Bye que será chamada pela aplicação Hello World para dar tchau](#352-criar-uma-classe-bye-bye-que-será-chamada-pela-aplicação-hello-world-para-dar-tchau)
- [I - Referências](#i---referências)



## 2. Documentação

### 2.1. Diagrama de Caso de Uso (Use Case Diagram)

![UseCaseDiagram-Context.png](../doc/uml-diagrams/UseCaseDiagram-dotnet-helloworld.png) 

### 2.2. Diagrama de Implantação (Deploy Diagram)

![DeployDiagram-Context.png](../doc/uml-diagrams/DeployDiagram-kubernetes-docker-rancherdesktop-dotnet.png) 


### 2.9. Glossário de Termos (Glossary)

De uma forma geral, vamos tentar <ins>definir</ins> e <ins>caracterizar</ins> alguns dos termos utilizados neste projeto para permitir uma melhor compreensão e entendimento:

| Termo       | Significado                     |
| :---------- | :------------------------------ |
| `nerdctl`   | programa em linha de comando do Rancher Desktop que equivale ao `docker`. |


## 3. Projeto / Laboratório

### 3.1. Pré-Requisitos, Pré-Condições e Premissas

#### a. Tecnologias e ferramentas

* Windows OnPrimasse
* Visual Studio Code
* DotNet

#### b. Ferramental de apoio

* Ferramenta: [Draw.IO](https://app.diagrams.net/) (only for diagrams design and documentation)
* Ferramenta: [FreeMind for Windows](https://freemind.br.uptodown.com/windows)


### 3.3. Guia de Implantação, Configuração e Instalação

### 3.3.1. Instalar NET 6.0 SDK

* *Step-01*: Assistir vídeo tutorial de instalação
  * https://www.youtube.com/watch?v=S5HawDwjuUY

* *Step-02*: Baixar binário de instalação buscando no google por `sdk .net`
  * https://dotnet.microsoft.com/en-us/download
  * Procure por uma versão compatível com seu processador (.NET 6.0 x64)
    * https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/sdk-6.0.404-windows-x64-installer


* *Step-03*: Instala a versao .NET baixada

```cmd
C:\Downloads> dotnet-sdk-6.0.404-win-x64.exe
```


### 3.5. Guia de Estudo

#### 3.5.1. Criar aplicação Hello World

* *Step-01*: Abra o Visual Studio Code e escolha um diretório base para sua aplicação
  * Espera-se que o sub-diretório de sua aplicação não exista, então você pode criá-lo pelo VSCode

```cmd
C:\..\k8s-docker-iac-labs\src\dotnet-helloworld>
```

* *Step-02*: Inicialize o diretório de sua aplicação
  * Abra um terminal no VSCode e execute o comando `dotnet new console`

```cmd
C:\..\k8s-docker-iac-labs\src\dotnet-helloworld> dotnet new console
```

  * Observe que uma estrutura inicial foi criada em seu diretório com sub-pastas `.\bin` `.\obj` e arquivos `Program.cs` e `dotnet-helloworld.csproj`
  * Observe o conteúdo do arquivo `Program.cs`

```Program.cs
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
``` 

  * Observe o conteúdo do arquivo `dotnet-helloworld.csproj`

```dotnet-helloworld.csproj
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <RootNamespace>dotnet_helloworld</RootNamespace>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
```

* *Step-03*: Responder `Install` ao aviso do VSCode `Do you want to install the recommended extension for C#?`
  * Clique em `Install`


* *Step-04*: Executar o seu programa
  * Invocar a execução de seu programa no terminal com o comando `dotnet run`


```cmd
C:\..\k8s-docker-iac-labs\src\dotnet-helloworld> dotnet run
Hello, World!
```


#### 3.5.2. Criar uma classe Bye Bye que será chamada pela aplicação Hello World para dar tchau

* *Step-01*: Instalar C Sharp Extension para o VSCode chamada `C# Extension` de `JosKreativ`
  * Clique no menu lateral do VSCode de `Extension` e procure por `C# Extension`
  * Instalar a extensão e em seguida reiniciar o VSCode

* *Step-02*: Creie uma nova classe `ByeBye`
  * Clique com botão invertido sobre o menu lateral sobre o diretório de seu projeto `dotnet-helloword`
  * Escolha a opção `New C$ >> Class`
  * Informe o nome da classe `ByeBye``
  * Observe que um novo arquivo `ByeBye.cs` foi criado com um template de classe
  * Ajuste o conteúdo da classe, criando um método `SayByeBye()` para dizer bye bye

```ByeBye.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_helloworld
{
    public class ByeBye
    {
        public void SayByeBye(){
            System.Console.WriteLine("Bye Bye!");
        }
    }
}
```

* *Step-03*: Edite o arquivo `Program.cs` para instancie um objeto da classe `ByeBye` e invocar seu método

```Program.cs
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

dotnet_helloworld.ByeBye byeBye = new dotnet_helloworld.ByeBye();
byeBye.SayByeBye();
```


## I - Referências

* DotNet
  * [Como instalar e configurar C Sharp no Visual Studio Code](https://www.youtube.com/watch?v=S5HawDwjuUY)
  * [Curso de C# Para Iniciantes - C# 10 .NET 6 e VS Code](https://www.youtube.com/watch?v=oTivhgjbhIg)
* Github README.md writing sintax
  * [Basic Github Markdown Writing Format](https://docs.github.com/pt/free-pro-team@latest/github/writing-on-github/basic-writing-and-formatting-syntax)  
  * [Github Markdown Chead Sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)
  * [Github Mastering Markdown](https://guides.github.com/features/mastering-markdown/#what)
  * [Table of contents generated with markdown-toc](http://ecotrust-canada.github.io/markdown-toc/)

