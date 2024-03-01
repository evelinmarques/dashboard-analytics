import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';

const LinkTable = ({ links }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  const columns = [
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Links Mais Acessados nos últimos 7 dias',
      dataIndex: 'clicks',
      key: 'clicks',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <Button type="link" onClick={() => handleLinkClick(record)}>
          Informações
        </Button>
      ),
    },
  ];

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    setModalVisible(true);
  };

  const modalContent = (
    <div>
      <p><strong>URL:</strong> {selectedLink?.url}</p>
      <p><strong>Cliques nos últimos 7 dias:</strong> {selectedLink?.clicks}</p>
    </div>
  );

  return (
    <>
      <Table
        dataSource={links}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: '20px' }}
        scroll={{ x: true }}
      />
      <Modal
        title="Detalhes do Link"
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default LinkTable;
