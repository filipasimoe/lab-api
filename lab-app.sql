-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09-Jul-2022 às 17:30
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

-- --------------------------------------------------------

--
-- Estrutura da tabela `projectresearchers`
--

CREATE TABLE `projectresearchers` (
  `IDPR` int(11) NOT NULL,
  `IDR` int(11) NOT NULL,
  `IDP` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
