import { FilePdfOutlined, FileTextOutlined, PictureOutlined, VideoCameraOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Button, Card, Image, List, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface Resource {
  id: string;
  name: string;
  resource_type: string;
  file_url: string;
  icon_url: string | null;
  is_enabled: boolean;
  label: string;
  usage_stats: {
    used_count: number;
    unused_count: number;
    total_students: number;
  };
  html_games: any[];
}

interface FilePreviewData {
  resources: Resource[];
  ai_tools: any[];
  total_resources: number;
  total_ai_tools: number;
}

// 模拟数据
const mockData: FilePreviewData = {
  resources: [
    {
      id: "515037ba-448b-4104-b349-3041d0e62d8c",
      name: "总结.docx",
      resource_type: "DOCUMENT",
      file_url: "https://9jian-textbookly-dev.oss-cn-shenzhen.aliyuncs.com/teaching_resources/09a7ae9c-03df-4e2f-8b0e-bec6906acc65/48a00386-c752-4523-8070-536112735571.docx",
      icon_url: null,
      is_enabled: true,
      label: "文稿",
      usage_stats: {
        used_count: 0,
        unused_count: 6,
        total_students: 6
      },
      html_games: []
    },
    {
      id: "ae78175e-77cb-43fa-b724-ce6cddd1fd6c",
      name: "谁是大掌柜汇报3.31.pptx",
      resource_type: "PRESENTATION",
      file_url: "https://9jian-textbookly-dev.oss-cn-shenzhen.aliyuncs.com/teaching_resources/09a7ae9c-03df-4e2f-8b0e-bec6906acc65/7aeb54bc-9e3b-47dd-940c-0d04787200e6.pptx",
      icon_url: null,
      is_enabled: true,
      label: "演示文稿",
      usage_stats: {
        used_count: 0,
        unused_count: 6,
        total_students: 6
      },
      html_games: []
    },
    {
      id: "4c882f9d-f632-44ab-aadf-a03a64f1d1c0",
      name: "QQ录屏20231107162621.mp4",
      resource_type: "VIDEO",
      file_url: "https://9jian-textbookly-dev.oss-cn-shenzhen.aliyuncs.com/teaching_resources/09a7ae9c-03df-4e2f-8b0e-bec6906acc65/55db1e1a-dfe6-4eba-80db-840c1cc6c042.mp4",
      icon_url: null,
      is_enabled: true,
      label: "视频",
      usage_stats: {
        used_count: 0,
        unused_count: 6,
        total_students: 6
      },
      html_games: []
    },
    {
      id: "8b7ebf1c-4663-42cb-83be-baeb193f947f",
      name: "QQ图片20230624193121.jpg",
      resource_type: "IMAGE",
      file_url: "https://9jian-textbookly-dev.oss-cn-shenzhen.aliyuncs.com/teaching_resources/09a7ae9c-03df-4e2f-8b0e-bec6906acc65/bf7c002e-4ca1-4562-95c9-a41f5da1d49e.jpg",
      icon_url: null,
      is_enabled: true,
      label: "图片",
      usage_stats: {
        used_count: 0,
        unused_count: 6,
        total_students: 6
      },
      html_games: []
    },
    {
      id: "d278d8b3-cf3d-4b00-9bb3-a1798883af9a",
      name: "day12-Pinia入门.pdf",
      resource_type: "DOCUMENT",
      file_url: "https://9jian-textbookly-dev.oss-cn-shenzhen.aliyuncs.com/teaching_resources/09a7ae9c-03df-4e2f-8b0e-bec6906acc65/39b0d732-813d-448e-b7aa-2ac598c8cd6d.pdf",
      icon_url: null,
      is_enabled: true,
      label: "文稿",
      usage_stats: {
        used_count: 0,
        unused_count: 6,
        total_students: 6
      },
      html_games: []
    }
  ],
  ai_tools: [],
  total_resources: 8,
  total_ai_tools: 0
};

// 获取视频 MIME 类型
const getVideoType = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase();
  const typeMap: Record<string, string> = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogv': 'video/ogg',
    'ogg': 'video/ogg',
    'mov': 'video/quicktime',
    'avi': 'video/x-msvideo',
    'wmv': 'video/x-ms-wmv',
    'flv': 'video/x-flv',
    'm3u8': 'application/x-mpegURL',
    'm3u': 'application/x-mpegURL',
  };
  return typeMap[extension || ''] || 'video/mp4';
};

// Video.js 播放器组件
const VideoPlayer = ({ src, onReady }: { src: string; onReady?: (player: any) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      const player = videojs(videoRef.current, {
        controls: true,
        responsive: true,
        fluid: true,
        aspectRatio: '16:9',
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        controlBar: {
          pictureInPictureToggle: false,
        },
        html5: {
          vhs: {
            overrideNative: true
          },
          nativeVideoTracks: false,
          nativeAudioTracks: false,
          nativeTextTracks: false
        }
      });

      playerRef.current = player;

      player.ready(() => {
        if (onReady) {
          onReady(player);
        }
        const controlBar = player.getChild('controlBar') as any;
        const pipButton = controlBar?.getChild?.('PictureInPictureToggle');
        pipButton?.hide?.();
      });

      player.on('error', () => {
        const error = player.error();
        if (error) {
          console.error('Video.js error:', error);
        }
      });

      player.on('loadedmetadata', () => {
        console.log('metadata', {
          width: player.videoWidth(),
          height: player.videoHeight(),
          duration: player.duration(),
          readyState: player.readyState()
        });
      });

      if (src) {
        const videoType = getVideoType(src);
        player.src({ src, type: videoType });
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && src) {
      const videoType = getVideoType(src);
      playerRef.current.src({ src, type: videoType });
    }
  }, [src]);

  return (
    <div data-vjs-player style={{ width: '100%', maxWidth: '100%' }}>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

function FilePreview() {
  const [selectedFile, setSelectedFile] = useState<Resource | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  // 按类型分组文件
  const groupedResources = {
    all: mockData.resources,
    document: mockData.resources.filter(r => r.resource_type === 'DOCUMENT'),
    presentation: mockData.resources.filter(r => r.resource_type === 'PRESENTATION'),
    video: mockData.resources.filter(r => r.resource_type === 'VIDEO'),
    image: mockData.resources.filter(r => r.resource_type === 'IMAGE'),
  };

  // 处理文件点击
  const handleFileClick = (resource: Resource) => {
    setSelectedFile(resource);
    setPreviewVisible(true);
  };

  // 渲染预览内容
  const renderPreview = () => {
    if (!selectedFile) return null;

    const { resource_type, file_url, name } = selectedFile;

    switch (resource_type) {
      case 'IMAGE':
        return (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Image
              src={file_url}
              alt={name}
              style={{ maxWidth: '100%', maxHeight: '80vh' }}
              preview={false}
            />
          </div>
        );
      case 'VIDEO':
        return (
          <div style={{ 
            padding: '20px', 
            width: '100%', 
            maxWidth: '1200px', 
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
          }}>
            <div style={{ width: '100%' }}>
              <VideoPlayer src={file_url} />
            </div>
          </div>
        );
      case 'DOCUMENT':
      case 'PRESENTATION':
        // PDF 可以直接预览，DOCX 和 PPTX 需要在线预览服务
        if (file_url.endsWith('.pdf')) {
          return (
            <div style={{ height: '80vh', width: '100%' }}>
              <iframe
                src={file_url}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={name}
              />
            </div>
          );
        } else {
          // DOCX 和 PPTX 使用在线预览服务或下载
          return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>该文件类型需要在线预览服务支持</p>
              <Button
                type="primary"
                onClick={() => window.open(file_url, '_blank')}
              >
                在新窗口中打开
              </Button>
            </div>
          );
        }
      default:
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>不支持预览此文件类型</p>
            <Button
              type="primary"
              onClick={() => window.open(file_url, '_blank')}
            >
              下载文件
            </Button>
          </div>
        );
    }
  };

  // Tab 配置
  const tabItems: TabsProps['items'] = [
    {
      key: 'all',
      label: '全部',
      children: (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={groupedResources.all}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ cursor: 'pointer' }}
                onClick={() => handleFileClick(item)}
                cover={
                  item.resource_type === 'IMAGE' ? (
                    <Image
                      src={item.file_url}
                      alt={item.name}
                      height={150}
                      style={{ objectFit: 'cover' }}
                      preview={false}
                    />
                  ) : (
                    <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                      {item.resource_type === 'DOCUMENT' && <FileTextOutlined style={{ fontSize: 48, color: '#1890ff' }} />}
                      {item.resource_type === 'PRESENTATION' && <FilePdfOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />}
                      {item.resource_type === 'VIDEO' && <VideoCameraOutlined style={{ fontSize: 48, color: '#52c41a' }} />}
                      {item.resource_type === 'IMAGE' && <PictureOutlined style={{ fontSize: 48, color: '#faad14' }} />}
                    </div>
                  )
                }
              >
                <Card.Meta
                  title={item.name}
                  description={item.label}
                />
              </Card>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'document',
      label: '文稿',
      children: (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={groupedResources.document}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ cursor: 'pointer' }}
                onClick={() => handleFileClick(item)}
                cover={
                  <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                    <FileTextOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                  </div>
                }
              >
                <Card.Meta
                  title={item.name}
                  description={item.label}
                />
              </Card>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'presentation',
      label: '演示文稿',
      children: (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={groupedResources.presentation}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ cursor: 'pointer' }}
                onClick={() => handleFileClick(item)}
                cover={
                  <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                    <FilePdfOutlined style={{ fontSize: 48, color: '#ff4d4f' }} />
                  </div>
                }
              >
                <Card.Meta
                  title={item.name}
                  description={item.label}
                />
              </Card>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'video',
      label: '视频',
      children: (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={groupedResources.video}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ cursor: 'pointer' }}
                onClick={() => handleFileClick(item)}
                cover={
                  <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
                    <VideoCameraOutlined style={{ fontSize: 48, color: '#52c41a' }} />
                  </div>
                }
              >
                <Card.Meta
                  title={item.name}
                  description={item.label}
                />
              </Card>
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'image',
      label: '图片',
      children: (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={groupedResources.image}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                style={{ cursor: 'pointer' }}
                onClick={() => handleFileClick(item)}
                cover={
                  <Image
                    src={item.file_url}
                    alt={item.name}
                    height={150}
                    style={{ objectFit: 'cover' }}
                    preview={false}
                  />
                }
              >
                <Card.Meta
                  title={item.name}
                  description={item.label}
                />
              </Card>
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Tabs defaultActiveKey="all" items={tabItems} />
      
      {previewVisible && selectedFile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
          }}
        >
          <div style={{ background: 'white', borderRadius: '8px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{selectedFile.name}</h3>
              <Button onClick={() => setPreviewVisible(false)}>关闭</Button>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              {renderPreview()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilePreview;
