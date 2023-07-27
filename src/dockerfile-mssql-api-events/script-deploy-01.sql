CREATE DATABASE db_api_events
GO

USE db_api_events
GO

CREATE TABLE tbl_api_events (
    id         INT           NOT NULL IDENTITY(1,1), 
    key_info   NVARCHAR(30)  NOT NULL,
    data_info  NVARCHAR(MAX),
    json_info  NVARCHAR(MAX),
    created_at DATETIME      NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME      NOT NULL DEFAULT GETDATE(),
    created_by NVARCHAR(100) NOT NULL DEFAULT 'unknown',
    updatet_by NVARCHAR(100) NOT NULL DEFAULT 'unknown',
    is_removed BIT           NOT NULL DEFAULT(0),
    PRIMARY KEY (id),
    CONSTRAINT ak_api_events UNIQUE(key_info)
);
GO
