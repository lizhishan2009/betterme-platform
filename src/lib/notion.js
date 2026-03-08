// Notion API 客户端配置
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const PAGE_ID = process.env.NOTION_PAGE_ID || '2f28cf1fb6ec80a7a49bc7fbab717565';

/**
 * 获取 Notion 页面信息
 */
export async function getPageInfo() {
  try {
    const response = await notion.pages.retrieve({
      page_id: PAGE_ID,
    });
    return response;
  } catch (error) {
    console.error('Error fetching page info:', error);
    return null;
  }
}

/**
 * 获取页面标题
 */
export async function getPageTitle() {
  try {
    const page = await getPageInfo();
    if (!page) return 'BetterMe';
    
    // @ts-ignore
    return page.properties?.title?.title?.[0]?.plain_text || 
           // @ts-ignore
           page.properties?.Name?.title?.[0]?.plain_text ||
           'BetterMe';
  } catch (error) {
    console.error('Error getting page title:', error);
    return 'BetterMe';
  }
}

/**
 * 获取页面所有内容块
 */
export async function getPageContent(maxBlocks = 100) {
  try {
    const blocks = [];
    let cursor;
    
    while (blocks.length < maxBlocks) {
      // @ts-ignore
      const response = await notion.blocks.children.list({
        block_id: PAGE_ID,
        start_cursor: cursor,
        page_size: 100,
      });
      
      blocks.push(...response.results);
      
      if (!response.has_more) break;
      cursor = response.next_cursor;
    }
    
    return blocks.slice(0, maxBlocks);
  } catch (error) {
    console.error('Error fetching page content:', error);
    return [];
  }
}

/**
 * 递归获取子块内容
 */
export async function getChildBlocks(blockId, maxDepth = 2, currentDepth = 0) {
  if (currentDepth >= maxDepth) return [];
  
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100,
    });
    
    const blocks = await Promise.all(
      response.results.map(async (block) => {
        // @ts-ignore
        if (block.has_children) {
          // @ts-ignore
          block.children = await getChildBlocks(block.id, maxDepth, currentDepth + 1);
        }
        return block;
      })
    );
    
    return blocks;
  } catch (error) {
    console.error('Error fetching child blocks:', error);
    return [];
  }
}

/**
 * 获取完整页面内容（包含子块）
 */
export async function getFullPageContent() {
  try {
    const blocks = await getPageContent(50);
    
    const blocksWithChildren = await Promise.all(
      blocks.map(async (block) => {
        // @ts-ignore
        if (block.has_children) {
          // @ts-ignore
          block.children = await getChildBlocks(block.id);
        }
        return block;
      })
    );
    
    return blocksWithChildren;
  } catch (error) {
    console.error('Error fetching full content:', error);
    return [];
  }
}

/**
 * 将 Notion 块转换为简化对象
 */
export function simplifyBlock(block) {
  // @ts-ignore
  const type = block.type;
  // @ts-ignore
  const obj = block[type];
  
  const result = {
    id: block.id,
    type,
    hasChildren: block.has_children,
  };
  
  switch (type) {
    case 'paragraph':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      break;
    case 'heading_1':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      break;
    case 'heading_2':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      break;
    case 'heading_3':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      break;
    case 'bulleted_list_item':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      break;
    case 'numbered_list_item':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      break;
    case 'to_do':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      result.checked = obj.checked;
      break;
    case 'toggle':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      break;
    case 'code':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      result.language = obj.language;
      break;
    case 'quote':
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
      break;
    case 'divider':
      break;
    case 'image':
      // @ts-ignore
      result.url = obj.file?.url || obj.external?.url || '';
      result.caption = obj.caption?.map(t => t.plain_text).join('') || '';
      break;
    case 'video':
      // @ts-ignore
      result.url = obj.file?.url || obj.external?.url || '';
      break;
    case 'embed':
      result.url = obj.url;
      break;
    case 'bookmark':
      result.url = obj.url;
      result.caption = obj.caption?.map(t => t.plain_text).join('') || '';
      break;
    default:
      result.text = obj.rich_text?.map(t => t.plain_text).join('') || '';
  }
  
  return result;
}

export default notion;
