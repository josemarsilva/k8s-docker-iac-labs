CREATE DATABASE ApiEvents
GO

USE ApiEvents
GO

CREATE TABLE tbl_api_events (
    id INT NOT NULL IDENTITY(1,1),  
    reference VARCHAR(30) NOT NULL,
    note VARCHAR(255),
    created_at DATETIME,
    created_by VARCHAR(100),
    updated_at DATETIME,
    updatet_by VARCHAR(100),
    is_removed BIT DEFAULT(0),
    PRIMARY KEY (id),
    CONSTRAINT AK_api_events UNIQUE(reference) 
);
GO

CREATE TABLE tbl_api_tags (
    id INT NOT NULL,  
    tag VARCHAR(30) NOT NULL,
    created_at DATETIME DEFAULT(GETDATE()),
    created_by VARCHAR(100),
    updated_at DATETIME DEFAULT(GETDATE()),
    updatet_by VARCHAR(100),
    is_removed BIT DEFAULT(0),
    PRIMARY KEY (id),
    CONSTRAINT AK_api_tags UNIQUE(reference) 
);
GO
