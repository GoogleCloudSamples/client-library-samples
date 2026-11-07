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

// [START cloudresourcemanager_v3_tagkeys_tagkey_get]

import (
	"context"
	"fmt"
	"io"

	cloudresourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// getTagKey retrieves a TagKey resource by its numeric ID.
func getTagKey(ctx context.Context, w io.Writer, tagKeyID string) error {
	name := fmt.Sprintf("tagKeys/%s", tagKeyID)

	client, err := cloudresourcemanager.NewTagKeysClient(ctx)
	if err != nil {
		return fmt.Errorf("NewTagKeysClient: %w", err)
	}
	defer client.Close()

	req := &resourcemanagerpb.GetTagKeyRequest{
		Name: name,
	}

	tagKey, err := client.GetTagKey(ctx, req)
	if err != nil {
		return fmt.Errorf("GetTagKey: %w", err)
	}

	fmt.Fprintf(w, "Retrieved TagKey: %s\n", tagKey.GetName())
	return nil
}

// [END cloudresourcemanager_v3_tagkeys_tagkey_get]
