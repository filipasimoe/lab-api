-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05-Jul-2022 às 19:47
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 7.4.27

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
(1, 0, 17),
(2, 4, 17),
(3, 5, 17),
(4, 6, 17),
(5, 7, 17),
(6, 8, 17),
(7, 9, 17),
(8, 0, 17),
(9, 0, 17),
(10, 0, 17),
(11, 0, 17),
(12, 0, 17);

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
(1, '5Generative Adversarial Graph Convolutional Networks for Human Action Synthesis', 11, 2012, 'https://www.di.ubi.pt/~jcneves/publications.html', 'Bruno Degardin, João Neves, Vasco Lopes, João Brito, Ehsan Yaghoubi and Hugo Proença', 'IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)'),
(2, '1Generative Adversarial Graph Convolutional Networks for Human Action Synthesis', 11, 2012, 'https://www.di.ubi.pt/~jcneves/publications.html', 'Bruno Degardin, João Neves, Vasco Lopes, João Brito, Ehsan Yaghoubi and Hugo Proença', 'IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)'),
(3, '2Generative Adversarial Graph Convolutional Networks for Human Action Synthesis', 11, 2012, 'https://www.di.ubi.pt/~jcneves/publications.html', 'Bruno Degardin, João Neves, Vasco Lopes, João Brito, Ehsan Yaghoubi and Hugo Proença', 'IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)'),
(4, '3Generative Adversarial Graph Convolutional Networks for Human Action Synthesis', 11, 2012, 'https://www.di.ubi.pt/~jcneves/publications.html', 'Bruno Degardin, João Neves, Vasco Lopes, João Brito, Ehsan Yaghoubi and Hugo Proença', 'IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)'),
(5, '4Generative Adversarial Graph Convolutional Networks for Human Action Synthesis', 11, 2012, 'https://www.di.ubi.pt/~jcneves/publications.html', 'Bruno Degardin, João Neves, Vasco Lopes, João Brito, Ehsan Yaghoubi and Hugo Proença', 'IEEE/CVF Winter Conference on Applications of Computer Vision (WACV)');

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
(44, 17, 56),
(45, 17, 57),
(46, 17, 58),
(47, 17, 59),
(48, 17, 60);

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
(56, '2InovFarmer.MED - Improving Mediterranean Supply Chain through Innovative Agro-food Business Models to Strengthen Small-scale Farmers Competitiveness', 1, ' International project funded by Partnership for Research and Innovation in the Mediterranean Area (PRIMA)', ' InovFarmer.MED aims to improve Mediterranean supply chain by promoting the adoption of innovative and sustainable Business models and partnership on the agro-food systems, providing strategies and digital technologies to cope with any crisis. InovFarmer.MED is expected to improve the two study case agri-food value chain products, valorizing Fig and Prickly Pear, by enabling the adoption of adapted Digital technologies that pave the way for a smart agri-food supply chain linking farmers/producers to food processing and retail in three piloting sites - Portugal, Algeria and Egypt.', 20022),
(57, '3InovFarmer.MED - Improving Mediterranean Supply Chain through Innovative Agro-food Business Models to Strengthen Small-scale Farmers Competitiveness', 1, ' International project funded by Partnership for Research and Innovation in the Mediterranean Area (PRIMA)', ' InovFarmer.MED aims to improve Mediterranean supply chain by promoting the adoption of innovative and sustainable Business models and partnership on the agro-food systems, providing strategies and digital technologies to cope with any crisis. InovFarmer.MED is expected to improve the two study case agri-food value chain products, valorizing Fig and Prickly Pear, by enabling the adoption of adapted Digital technologies that pave the way for a smart agri-food supply chain linking farmers/producers to food processing and retail in three piloting sites - Portugal, Algeria and Egypt.', 20022),
(58, '4InovFarmer.MED - Improving Mediterranean Supply Chain through Innovative Agro-food Business Models to Strengthen Small-scale Farmers Competitiveness', 1, ' International project funded by Partnership for Research and Innovation in the Mediterranean Area (PRIMA)', ' InovFarmer.MED aims to improve Mediterranean supply chain by promoting the adoption of innovative and sustainable Business models and partnership on the agro-food systems, providing strategies and digital technologies to cope with any crisis. InovFarmer.MED is expected to improve the two study case agri-food value chain products, valorizing Fig and Prickly Pear, by enabling the adoption of adapted Digital technologies that pave the way for a smart agri-food supply chain linking farmers/producers to food processing and retail in three piloting sites - Portugal, Algeria and Egypt.', 20022),
(59, '5InovFarmer.MED - Improving Mediterranean Supply Chain through Innovative Agro-food Business Models to Strengthen Small-scale Farmers Competitiveness', 1, ' International project funded by Partnership for Research and Innovation in the Mediterranean Area (PRIMA)', ' InovFarmer.MED aims to improve Mediterranean supply chain by promoting the adoption of innovative and sustainable Business models and partnership on the agro-food systems, providing strategies and digital technologies to cope with any crisis. InovFarmer.MED is expected to improve the two study case agri-food value chain products, valorizing Fig and Prickly Pear, by enabling the adoption of adapted Digital technologies that pave the way for a smart agri-food supply chain linking farmers/producers to food processing and retail in three piloting sites - Portugal, Algeria and Egypt.', 20022),
(60, '6InovFarmer.MED - Improving Mediterranean Supply Chain through Innovative Agro-food Business Models to Strengthen Small-scale Farmers Competitiveness', 1, ' International project funded by Partnership for Research and Innovation in the Mediterranean Area (PRIMA)', ' InovFarmer.MED aims to improve Mediterranean supply chain by promoting the adoption of innovative and sustainable Business models and partnership on the agro-food systems, providing strategies and digital technologies to cope with any crisis. InovFarmer.MED is expected to improve the two study case agri-food value chain products, valorizing Fig and Prickly Pear, by enabling the adoption of adapted Digital technologies that pave the way for a smart agri-food supply chain linking farmers/producers to food processing and retail in three piloting sites - Portugal, Algeria and Egypt.', 20022);

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
(17, 1, 'Daniela Martins', 'person.jpg', 'A Daniela estudou na UBI e gosta de aviões', 'CEO'),
(19, 2, 'Filipa Barreiro', 'team1.jpg', 'A Filipa estudou na UBI e gosta de dançar', 'CTO'),
(21, 3, 'Helena Simões', 'person.jpg', 'A Helena estudou no IPL e gosta da Filipa', 'CFO'),
(22, 4, 'Simão Simões', 'team1.jpg', 'O Simão gosta de limão', 'HR');

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
(1, 'daniela@gmail.com', '$2a$10$J1b59y14fAgtnumbPiYWbuapwv8n5YDraT63MvcBDgyyqFCZe.m3q', 1),
(2, 'filipa@gmail.com', '$2a$10$yqPDcS9yp0rBCZTBdakm1epV2rVhHWGl0eIGgzwRsaAzYeoF1fOhK', 1),
(3, 'helena@gmail.com', '$2a$10$GFJ6Ca1IRxWS1Qadw29kIeFl.fHSlkUGDXyERS.psiSdNeHBHnTIW', 0),
(4, 'simoes@gmail.com', '$2a$10$T00E9Iq8Psk0YgD6r7dGvulJ2J6DSXnPN.BSK5AZd/TcvvHHZm15C', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `articleresearchers`
--
ALTER TABLE `articleresearchers`
  ADD PRIMARY KEY (`IDAR`);

--
-- Índices para tabela `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`IDA`);

--
-- Índices para tabela `projectresearchers`
--
ALTER TABLE `projectresearchers`
  ADD PRIMARY KEY (`IDPR`);

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
  MODIFY `IDAR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `articles`
--
ALTER TABLE `articles`
  MODIFY `IDA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `projectresearchers`
--
ALTER TABLE `projectresearchers`
  MODIFY `IDPR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de tabela `projects`
--
ALTER TABLE `projects`
  MODIFY `IDP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de tabela `researchers`
--
ALTER TABLE `researchers`
  MODIFY `IDR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `IDU` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `researchers`
--
ALTER TABLE `researchers`
  ADD CONSTRAINT `researchers_ibfk_1` FOREIGN KEY (`IDU`) REFERENCES `users` (`IDU`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
