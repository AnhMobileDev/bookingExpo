import React from 'react';

const MaintenanceEmptyIcon: React.FC<{ id: string }> = ({ id }) => (
  <svg width={186} height={160} viewBox="0 0 186 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M96.7014 134.981C124.695 134.981 147.388 112.145 147.388 83.975C147.388 55.8053 124.695 32.9692 96.7014 32.9692C68.7076 32.9692 46.0143 55.8053 46.0143 83.975C46.0143 112.145 68.7076 134.981 96.7014 134.981Z"
      fill="#EAEEF9"
    />
    <path
      d="M114.792 29.1873C115.25 28.7665 115.282 28.0521 114.863 27.5917C114.445 27.1312 113.735 27.0991 113.278 27.5198C112.82 27.9406 112.788 28.655 113.206 29.1155C113.625 29.5759 114.334 29.6081 114.792 29.1873Z"
      fill="#EAEEF9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M94.2879 134.676C94.3571 133.788 94.6758 132.939 95.4458 132.173C96.1991 131.424 96.9523 130.675 97.7056 129.676C99.4927 127.677 101.478 128.247 103.84 128.924C104.133 129.008 104.431 129.094 104.736 129.177C108.265 130.002 109.391 127.074 111.094 122.649C111.451 121.721 111.834 120.727 112.269 119.687C113.794 116.653 111.539 115.312 109.111 113.868C108.74 113.648 108.366 113.425 108.001 113.194C105.859 111.916 105.909 109.911 105.97 107.489C105.981 107.072 105.992 106.642 105.992 106.202C105.757 103.632 107.664 102.483 109.505 101.374C111.599 100.112 113.606 98.9034 112.269 95.7133C111.942 94.932 111.64 94.1805 111.354 93.4664C109.441 88.7022 108.197 85.6047 104.485 86.4734C104.157 86.5624 103.836 86.655 103.521 86.7456C101.19 87.4177 99.2246 87.984 97.4545 86.2236C96.9637 85.6744 96.4578 85.1997 95.9809 84.7522C94.5062 83.3686 93.3086 82.2449 93.6881 79.9805C95.2488 73.3281 94.8298 73.1734 87.8604 70.5998C86.9809 70.275 85.9971 69.9117 84.8997 69.4919C81.6939 68.2963 80.5488 70.2809 79.3475 72.3629C78.2906 74.1946 77.1902 76.1017 74.6048 75.9848C74.0172 75.9848 73.4486 76.0133 72.9029 76.0407C70.6504 76.1536 68.7869 76.247 67.5741 74.2367C63.9889 68.4425 63.6031 68.6145 56.6022 71.7357C55.758 72.112 54.8176 72.5313 53.7638 72.9881C50.3143 74.4584 51.2169 77.3715 52.2009 80.5476C52.2197 80.6082 52.2385 80.6689 52.2573 80.7296C52.8533 83.1009 51.5628 84.3776 50.0028 85.9208C49.5914 86.3279 49.1612 86.7534 48.7419 87.2225C47.9988 88.0672 47.1434 88.4208 46.2352 88.5099C48.5576 113.642 68.9997 133.483 94.2879 134.676ZM68.0763 121.685C75.3581 124.432 83.6443 120.936 86.4063 113.694C89.1684 106.452 85.653 98.2105 78.3712 95.4635C71.0895 92.7165 62.8033 96.2127 60.0412 103.455C57.2792 110.697 60.7945 118.938 68.0763 121.685Z"
      fill={`url(#paint0_${id})`}
    />
    <path
      d="M131.721 67.1154C131.524 64.1315 131.918 62.1423 129.947 61.9434C128.567 61.7444 127.581 61.9434 126.989 60.7498C126.398 59.5563 125.609 58.5616 126.398 57.567C128.369 54.5832 127.778 54.7821 124.426 51.5993C122.258 49.61 121.272 53.7875 119.103 52.7928C117.92 52.1961 116.737 52.1961 116.343 50.8036C115.554 47.4219 115.554 47.8197 110.823 48.0186C109.048 48.0186 109.048 49.61 109.048 51.2014C108.851 52.5939 107.865 52.7928 106.485 53.3896C104.317 54.5832 102.937 50.6047 100.965 52.7928C99.9793 53.7875 99.1907 54.7821 98.4021 55.9756C97.8106 57.567 99.1907 57.9649 99.9793 59.3573C99.9793 59.3573 99.9793 59.3573 99.9793 59.5563C100.176 59.9541 99.9793 60.352 99.9793 60.7498C99.9793 60.9487 99.7821 61.3466 99.7821 61.5455C99.3878 62.5401 99.3878 63.3358 98.2049 63.5348C94.8533 64.1315 95.2476 64.3305 95.4448 69.1046C95.6419 72.0885 99.1907 69.9003 100.176 72.0885C100.571 72.8842 101.359 74.0778 100.965 74.8735C100.768 75.6692 99.9793 76.2659 99.7821 77.0616C98.7964 78.852 100.571 79.8466 102.345 81.438C104.514 83.4272 105.5 79.2498 107.668 80.2444C110.231 81.239 110.034 80.6423 110.626 83.6261C111.02 85.6154 113.386 85.0186 115.949 84.8197C118.906 84.6208 116.737 81.0401 118.906 80.0455C119.3 79.8466 119.892 79.6477 120.286 79.4487C121.469 78.852 122.258 79.6476 123.441 80.2444C125.215 81.438 126.201 79.6477 128.172 77.2606C129.355 75.8681 128.172 74.8735 127.187 73.6799C126.398 72.6853 126.989 71.6907 127.384 70.2982C128.172 68.3089 131.918 70.0993 131.721 67.1154ZM118.117 70.895C115.752 73.481 111.809 73.8788 109.048 71.4917C106.485 69.1046 106.091 65.1262 108.457 62.3412C110.823 59.7552 114.766 59.3573 117.526 61.7444C120.089 64.1315 120.483 68.11 118.117 70.895Z"
      fill={`url(#paint1_${id})`}
    />
    <path
      d="M35.1936 82.9858C33.2684 83.935 32.4678 86.2709 33.4056 88.2031C34.3433 90.1353 36.6642 90.9321 38.5894 89.9829C40.5146 89.0337 41.3152 86.6978 40.3774 84.7656C39.4397 82.8334 37.1188 82.0365 35.1936 82.9858Z"
      fill="#EAEEF9"
    />
    <path
      d="M110.556 139.66C109.147 139.703 108.037 140.886 108.075 142.301C108.113 143.717 109.286 144.829 110.694 144.786C112.102 144.743 113.213 143.56 113.175 142.145C113.136 140.729 111.964 139.617 110.556 139.66Z"
      fill="#EAEEF9"
    />
    <path
      d="M102.858 146.125C101.901 146.154 101.145 146.958 101.171 147.921C101.197 148.884 101.995 149.64 102.952 149.611C103.91 149.581 104.665 148.777 104.639 147.815C104.613 146.852 103.816 146.096 102.858 146.125Z"
      fill="#EAEEF9"
    />
    <path
      d="M30.036 99.5422C29.2254 99.9418 28.8883 100.925 29.2832 101.739C29.678 102.552 30.6552 102.888 31.4658 102.488C32.2765 102.089 32.6135 101.105 32.2187 100.292C31.8239 99.478 30.8466 99.1425 30.036 99.5422Z"
      fill="#EAEEF9"
    />
    <path
      d="M62.7791 134.161C62.2215 134.436 61.9897 135.112 62.2612 135.672C62.5328 136.231 63.2049 136.462 63.7625 136.187C64.32 135.912 64.5519 135.236 64.2803 134.676C64.0087 134.117 63.3366 133.886 62.7791 134.161Z"
      fill="#EAEEF9"
    />
    <path
      d="M102.865 31.4007L91.0352 43.8402C87.3616 47.6538 81.4921 48.0992 77.8309 44.759C74.1698 41.4189 74.1115 35.6988 77.7851 31.8852L89.6147 19.4457C93.2883 15.6321 99.1578 15.1867 102.819 18.5268C106.517 21.7656 106.538 27.5871 102.865 31.4007Z"
      fill={`url(#paint2_${id})`}
    />
    <path
      d="M100.027 29.9562C102.346 27.46 102.25 23.6105 99.8124 21.358C97.3749 19.1055 93.5192 19.303 91.2005 21.7991C88.8818 24.2953 88.9781 28.1449 91.4156 30.3974C93.853 32.6498 97.7087 32.4523 100.027 29.9562Z"
      fill="white"
    />
    <g>
      <path
        d="M64.456 47.3452L61.1517 50.4517C60.7586 50.8126 60.1444 50.9376 59.6161 50.7643L55.6895 49.5412C55.1612 49.3679 54.7189 48.8962 54.6599 48.3652L53.7207 44.3996C53.5855 43.8654 53.7574 43.2687 54.1504 42.9079L57.4547 39.8013C57.6906 39.5848 57.7052 39.1324 57.4841 38.8966C57.4103 38.8179 57.2604 38.7361 57.1081 38.7297C54.1473 38.3024 51.2186 39.2355 49.096 41.1841C46.4207 43.7133 45.3819 47.5197 46.4119 51.0362L24.1615 71.5361C22.2723 73.3436 22.1007 76.2807 23.9438 78.2461C25.7131 80.1328 28.6837 80.2585 30.4943 78.5232L52.9806 57.8068C56.3027 58.8533 59.9145 58.0246 62.4326 55.6397C64.6338 53.6189 65.7194 50.7205 65.5077 47.8426C65.5199 47.4657 65.1464 47.2234 64.8417 47.2105C64.6894 47.204 64.6108 47.2762 64.456 47.3452ZM26.6216 75.6415C25.9581 74.9339 25.9948 73.803 26.7023 73.1535C27.4098 72.5039 28.4762 72.549 29.1397 73.2566C29.8032 73.9641 29.7665 75.095 29.059 75.7446C28.3515 76.3941 27.2851 76.349 26.6216 75.6415C26.6191 75.7169 26.6191 75.7169 26.6216 75.6415Z"
        fill="#D5DDEA"
      />
    </g>
    <path opacity={0.4} d="M46.2908 55.251L29.8616 70.1519" stroke="#D6DCE8" strokeMiterlimit={10} />
    <path opacity={0.4} d="M48.9213 58.0059L32.4163 72.9023" stroke="#D6DCE8" strokeMiterlimit={10} />
    <path
      d="M156.82 49.9885C156.475 49.7683 155.957 49.778 155.468 49.9762C154.618 50.5401 153.54 50.277 153.009 49.5125C152.75 49.1773 152.679 48.7064 152.823 48.288C152.968 47.8697 152.796 47.4195 152.35 47.2201L151.43 46.6329L149.96 48.5876L132.482 37.4312C132.252 37.2844 132.109 37.0226 132.08 36.8342L132.009 36.3633C131.952 35.9865 131.708 35.7455 131.377 35.6195L126.862 33.9288L124.527 37.0334L127.831 40.3338C128.075 40.5748 128.406 40.7008 128.809 40.6176L129.313 40.5136C129.615 40.4513 129.83 40.5039 130.06 40.6507L147.538 51.8071L146.067 53.7618L146.987 54.349C147.332 54.5692 147.85 54.5595 148.239 54.3821C149.089 53.8182 150.167 54.0812 150.698 54.8458C150.957 55.181 151.028 55.6519 150.883 56.0703C150.739 56.4886 151.012 56.918 151.357 57.1382L163.89 65.1385C165.845 66.3863 168.766 65.7833 170.237 63.8286C170.237 63.8286 170.323 63.7136 170.309 63.6194C171.664 61.5913 171.179 59.069 169.224 57.8212L156.82 49.9885Z"
      fill={`url(paint3_${id})`}
    />
    <path opacity={0.4} d="M153.97 55.7739L163.399 62.0326" stroke="#D6DCE8" strokeMiterlimit={10} />
    <path opacity={0.4} d="M155.579 53.4741L165.008 59.7327" stroke="#D6DCE8" strokeMiterlimit={10} />
    <g filter="url(#filter1_d_3366_50502)">
      <path
        d="M146.131 84.126L124.029 97.8396C122.828 98.5849 122.463 100.142 123.208 101.343L136.922 123.445C137.667 124.646 139.224 125.011 140.426 124.266L162.527 110.552C163.729 109.807 164.093 108.25 163.348 107.048L149.634 84.9466C148.889 83.7454 147.332 83.3807 146.131 84.126Z"
        fill="#D5DDEA"
      />
    </g>
    <path
      d="M147.743 93.0246L141.076 97.1611C139.896 96.0633 138.204 95.6158 136.659 96.0753C134.282 96.8018 132.962 99.3673 133.749 101.707L131.647 103.012C131.106 103.347 130.924 104.126 131.259 104.666C131.632 105.267 132.41 105.449 132.951 105.114L135.053 103.809C136.159 104.787 137.679 105.092 139.043 104.744C141.435 104.175 142.889 101.692 142.32 99.3004L149.047 95.1267C149.587 94.7913 149.77 94.0127 149.434 93.4722C149.122 92.8343 148.343 92.652 147.743 93.0246ZM140.009 100.402C140.038 100.716 139.97 101.008 139.804 101.278C139.721 101.412 139.698 101.51 139.578 101.584C139.435 101.756 139.352 101.89 139.172 102.002C138.248 102.659 137.021 102.422 136.364 101.499C136.327 101.439 136.327 101.439 136.29 101.379C135.693 100.418 136.027 99.2124 136.928 98.6535C137.829 98.0945 138.997 98.368 139.616 99.2316C139.839 99.592 140.003 99.9896 140.009 100.402ZM154.338 103.655L152.296 104.922C151.116 103.824 149.424 103.377 147.88 103.836C145.502 104.563 144.243 107.091 144.969 109.468L138.243 113.642C137.642 114.015 137.46 114.793 137.832 115.394C138.205 115.995 138.984 116.177 139.584 115.804L146.311 111.631C147.416 112.608 148.876 112.95 150.301 112.565C152.693 111.996 154.147 109.513 153.578 107.121L155.68 105.817C156.281 105.445 156.463 104.666 156.09 104.065C155.718 103.465 154.939 103.282 154.338 103.655ZM150.888 107.21C151.186 107.691 151.169 108.2 151.055 108.687C151.033 108.784 150.95 108.919 150.927 109.016C150.844 109.15 150.821 109.248 150.738 109.382C150.656 109.517 150.596 109.554 150.513 109.689C150.453 109.726 150.393 109.763 150.333 109.801C150.272 109.838 150.212 109.875 150.152 109.912C150.032 109.987 149.912 110.061 149.755 110.076C149.695 110.113 149.635 110.15 149.537 110.128C148.765 110.357 147.814 110.032 147.33 109.251C146.883 108.531 146.931 107.669 147.382 107.056C147.525 106.884 147.608 106.75 147.788 106.638C147.848 106.601 147.908 106.564 147.968 106.526C148.929 105.93 150.134 106.264 150.693 107.165C150.911 107.113 150.948 107.173 150.888 107.21Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id={`paint0_${id}`}
        x1={79.5056}
        y1={71.4078}
        x2={79.5056}
        y2={108.198}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#B0BACC" />
        <stop offset={1} stopColor="#969EAE" />
      </linearGradient>
      <linearGradient
        id={`paint1_${id}`}
        x1={113.527}
        y1={49.1833}
        x2={113.527}
        y2={70.0451}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#B0BACC" />
        <stop offset={1} stopColor="#969EAE" />
      </linearGradient>
      <linearGradient
        id={`paint2_${id}`}
        x1={85.5051}
        y1={21.9027}
        x2={91.5865}
        y2={33.5136}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#B0BACC" />
        <stop offset={1} stopColor="#969EAE" />
      </linearGradient>
      <linearGradient
        id={`paint3_${id}`}
        x1={145.173}
        y1={31.5423}
        x2={149.628}
        y2={53.1252}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#B0BACC" />
        <stop offset={1} stopColor="#969EAE" />
      </linearGradient>
    </defs>
  </svg>
);

export default MaintenanceEmptyIcon;
