// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START vision_v1_imageannotator_batch_annotate_files]

import (
	"context"
	"fmt"
	"io"

	vision "cloud.google.com/go/vision/v2/apiv1"
	visionpb "cloud.google.com/go/vision/v2/apiv1/visionpb"
)

// batchAnnotateFiles batches annotation requests for files such as PDF documents stored in Cloud Storage.
func batchAnnotateFiles(ctx context.Context, w io.Writer) error {
	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return fmt.Errorf("NewImageAnnotatorClient failed: %w", err)
	}
	defer client.Close()

	inputConfig := &visionpb.InputConfig{
		GcsSource: &visionpb.GcsSource{
			Uri: "gs://cloud-samples-data/vision/document_understanding/kafka.pdf",
		},
		MimeType: "application/pdf",
	}

	features := []*visionpb.Feature{
		{
			Type: visionpb.Feature_DOCUMENT_TEXT_DETECTION,
		},
	}

	requests := []*visionpb.AnnotateFileRequest{
		{
			InputConfig: inputConfig,
			Features:    features,
			Pages:       []int32{1},
		},
	}

	req := &visionpb.BatchAnnotateFilesRequest{
		Requests: requests,
	}

	resp, err := client.BatchAnnotateFiles(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchAnnotateFiles: %w", err)
	}

	for _, fileResponse := range resp.GetResponses() {
		for _, pageResponse := range fileResponse.GetResponses() {
			fmt.Fprintf(w, "Extracted text:\n%s\n", pageResponse.GetFullTextAnnotation().GetText())
		}
	}

	return nil
}

// [END vision_v1_imageannotator_batch_annotate_files]
