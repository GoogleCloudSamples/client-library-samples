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

// [START vision_v1_imageannotator_batch_annotate_images]

import (
	"context"
	"fmt"
	"io"

	vision "cloud.google.com/go/vision/v2/apiv1p1beta1"
	"cloud.google.com/go/vision/v2/apiv1p1beta1/visionpb"
)

// Use the BatchAnnotateImages method.
func batchAnnotateImages(ctx context.Context, w io.Writer) error {
	image := &visionpb.Image{
		Source: &visionpb.ImageSource{
			ImageUri: "gs://cloud-samples-data/vision/label/wakeupcat.jpg",
		},
	}
	feature := &visionpb.Feature{
		Type:       visionpb.Feature_LABEL_DETECTION,
		MaxResults: 5,
	}
	requests := []*visionpb.AnnotateImageRequest{
		{
			Image:    image,
			Features: []*visionpb.Feature{feature},
		},
	}

	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
		return fmt.Errorf("NewImageAnnotatorClient: %w", err)
	}
	defer client.Close()

	req := &visionpb.BatchAnnotateImagesRequest{
		Requests: requests,
	}

	resp, err := client.BatchAnnotateImages(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchAnnotateImages: %w", err)
	}

	for _, response := range resp.GetResponses() {
		if response.GetError() != nil {
			fmt.Fprintf(w, "Annotation error: %s\n", response.GetError().GetMessage())
			continue
		}
		for _, label := range response.GetLabelAnnotations() {
			fmt.Fprintf(w, "Label: %s (Score: %.2f)\n", label.GetDescription(), label.GetScore())
		}
	}

	return nil
}

// [END vision_v1_imageannotator_batch_annotate_images]
