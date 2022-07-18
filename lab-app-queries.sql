-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18-Jul-2022 às 12:53
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `lab-app`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `articleresearchers`
--

CREATE TABLE `articleresearchers` (
  `IDAR` int(11) NOT NULL,
  `IDA` int(11) NOT NULL,
  `IDR` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `articleresearchers`
--

INSERT INTO `articleresearchers` (`IDAR`, `IDA`, `IDR`) VALUES
(18, 11, 24),
(19, 12, 23);

-- --------------------------------------------------------

--
-- Estrutura da tabela `articles`
--

CREATE TABLE `articles` (
  `IDA` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `url` text NOT NULL,
  `authors` text NOT NULL,
  `context` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `articles`
--

INSERT INTO `articles` (`IDA`, `title`, `month`, `year`, `url`, `authors`, `context`) VALUES
(11, 'Generative Adversarial Graph Convolutional Networks for Human Action Synthesis', 12, 2001, 'https://github.com/filipasimoe/lab-app', 'Bruno Degardin, João Neves, Vasco Lopes, João Brito, Ehsan Yaghoubi and Hugo Proença', 'EEE/CVF Winter Conference on Applications of Computer Vision (WACV)'),
(12, 'ZSpeedL - Evaluating the Performance of Zero-Shot Learning Methods using Low-Power Devices', 12, 2001, 'https://github.com/filipasimoe/lab-app', 'Cristiano Patrício and João C. Neves', 'IEEE International Conference on Advanced Video and Signal based Surveillance (AVSS)');

-- --------------------------------------------------------

--
-- Estrutura da tabela `projectresearchers`
--

CREATE TABLE `projectresearchers` (
  `IDPR` int(11) NOT NULL,
  `IDR` int(11) NOT NULL,
  `IDP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `projectresearchers`
--

INSERT INTO `projectresearchers` (`IDPR`, `IDR`, `IDP`) VALUES
(55, 24, 67),
(56, 23, 68),
(57, 27, 69);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projects`
--

CREATE TABLE `projects` (
  `IDP` int(11) NOT NULL,
  `title` text DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `context` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `year` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `projects`
--

INSERT INTO `projects` (`IDP`, `title`, `duration`, `context`, `description`, `year`) VALUES
(67, '	 InovFarmer.MED - Improving Mediterranean Supply Chain through Innovative Agro-food Business Models to Strengthen Small-scale Farmers Competitiveness', 3, 'IEEE International Conference on Advanced Video and Signal based Surveillance (AVSS)', ' 	InovFarmer.MED aims to improve Mediterranean supply chain by promoting the adoption of innovative and sustainable Business models and partnership on the agro-food systems, providing strategies and digital technologies to cope with any crisis. InovFarmer.MED is expected to improve the two study case agri-food value chain products, valorizing Fig and Prickly Pear, by enabling the adoption of adapted Digital technologies that pave the way for a smart agri-food supply chain linking farmers/producers to food processing and retail in three piloting sites - Portugal, Algeria and Egypt.', 1997),
(68, 'Generative Adversarial Graph Convolutional Networks for Human Action Synthesis', 2, 'EEE/CVF Winter Conference on Applications of Computer Vision (WACV)', ' 	InovFarmer.MED aims to improve Mediterranean supply chain by promoting the adoption of innovative and sustainable Business models and partnership on the agro-food systems, providing strategies and digital technologies to cope with any crisis. InovFarmer.MED is expected to improve the two study case agri-food value chain products, valorizing Fig and Prickly Pear, by enabling the adoption of adapted Digital technologies that pave the way for a smart agri-food supply chain linking farmers/producers to food processing and retail in three piloting sites - Portugal, Algeria and Egypt.', 1997),
(69, 'Dont Stand So Close to Me: Sistema de Alerta Social Distanciado alimentado por IA', 2, 'Projecto nacional financiado pelo Instituto Politécnico de Viseu', 'A distância social necessária para controlar a propagação do vírus COVID-19 alterou drasticamente a nossa maneira de viver. As instituições prepararam-se para lidar com este contexto, mas os cidadãos, em particular a comunidade estudantil, tendem a não ser consistentes no seu comportamento quando se encontram nas instalações. É urgente criar instrumentos proactivos de sensibilização capazes de expor e dissuadir concentrações no ambiente das instituições e espaços públicos. Este projecto utiliza a área da Visão Computacional, e as áreas da Comunicação e Design de Interacção na implementação de técnicas de publicidade de choque. Será criado um sistema que, através de imagens capturadas, realizará uma avaliação automática das distâncias. Em casos de incumprimento, desencadeará alertas e enviará mensagens chocantes, dirigidas aos infractores. Para além de automatizar a verificação, o objectivo é avaliar a evolução do comportamento do público alvo à medida que este se expõe a este tipo de estímulo.\n', 2021);

-- --------------------------------------------------------

--
-- Estrutura da tabela `researchers`
--

CREATE TABLE `researchers` (
  `IDR` int(11) NOT NULL,
  `IDU` int(11) NOT NULL,
  `name` text NOT NULL,
  `photo` longtext NOT NULL,
  `bio` longtext NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `researchers`
--

INSERT INTO `researchers` (`IDR`, `IDU`, `name`, `photo`, `bio`, `role`) VALUES
(23, 5, 'Daniela Martins', 'CIMG0434.JPG', 'Uma pequena biografia', 'Tech Support'),
(24, 6, 'Filipa S. Barreiro', 'CIMG0434.JPG', 'Uma pequena biografia', 'CEO & CTO & CFO'),
(27, 9, 'Investigador Teste', 'team1.jpg', 'Uma pequena bio atualizada', 'Investigador');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `IDU` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `isAdmin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`IDU`, `email`, `password`, `isAdmin`) VALUES
(5, 'admin@gmail.com', '$2a$10$xp2BxftlYbTaXYAkxSfX0.nCyni2TCVEQRMzXeyQp4W7rS/Kac4D6', 1),
(6, 'filipa@gmail.com', '$2a$10$utfIuhmN8h8O3XlC66ycQOkw/MBZTG92j.49wuzMMBKgCfvlo74SS', 0),
(9, 'teste@gmail.com', '$2a$10$0a9x2Hh7TQ0GgXlXHZLSiut32na2QTBqpcfSq1Kx00HVUtPxHV4fW', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `articleresearchers`
--
ALTER TABLE `articleresearchers`
  ADD PRIMARY KEY (`IDAR`),
  ADD KEY `IDR` (`IDR`),
  ADD KEY `IDA` (`IDA`);

--
-- Índices para tabela `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`IDA`);

--
-- Índices para tabela `projectresearchers`
--
ALTER TABLE `projectresearchers`
  ADD PRIMARY KEY (`IDPR`),
  ADD KEY `IDR` (`IDR`),
  ADD KEY `IDP` (`IDP`);

--
-- Índices para tabela `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`IDP`);

--
-- Índices para tabela `researchers`
--
ALTER TABLE `researchers`
  ADD PRIMARY KEY (`IDR`),
  ADD KEY `IDU` (`IDU`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`IDU`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `articleresearchers`
--
ALTER TABLE `articleresearchers`
  MODIFY `IDAR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `articles`
--
ALTER TABLE `articles`
  MODIFY `IDA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `projectresearchers`
--
ALTER TABLE `projectresearchers`
  MODIFY `IDPR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de tabela `projects`
--
ALTER TABLE `projects`
  MODIFY `IDP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de tabela `researchers`
--
ALTER TABLE `researchers`
  MODIFY `IDR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `IDU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `articleresearchers`
--
ALTER TABLE `articleresearchers`
  ADD CONSTRAINT `articleresearchers_ibfk_1` FOREIGN KEY (`IDR`) REFERENCES `researchers` (`IDR`),
  ADD CONSTRAINT `articleresearchers_ibfk_2` FOREIGN KEY (`IDA`) REFERENCES `articles` (`IDA`);

--
-- Limitadores para a tabela `projectresearchers`
--
ALTER TABLE `projectresearchers`
  ADD CONSTRAINT `projectresearchers_ibfk_1` FOREIGN KEY (`IDR`) REFERENCES `researchers` (`IDR`),
  ADD CONSTRAINT `projectresearchers_ibfk_2` FOREIGN KEY (`IDP`) REFERENCES `projects` (`IDP`);

--
-- Limitadores para a tabela `researchers`
--
ALTER TABLE `researchers`
  ADD CONSTRAINT `researchers_ibfk_1` FOREIGN KEY (`IDU`) REFERENCES `users` (`IDU`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
